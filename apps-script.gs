/**
 * ALSA Website — Apps Script: event email notifications
 *
 * This file is *additional code* for your existing Apps Script project. It does
 * NOT replace your signup logic. To install:
 *
 * 1) Open script.google.com → open the project bound to your Members sheet.
 *
 * 2) Add a column titled exactly `promoOptIn` to the Members sheet (the same
 *    sheet your join form posts to). New signups send "Yes" / "No" into it.
 *
 * 3) Paste every function in this file into your project (e.g. into Code.gs
 *    after your existing functions).
 *
 * 4) In your existing `doPost(e)`, add the routing block at the very top so
 *    notify requests are handled separately from signups:
 *
 *       function doPost(e) {
 *         try {
 *           var body = JSON.parse(e.postData.contents);
 *           if (body.action === 'notify') {
 *             return jsonOut(handleNotify(body.event));
 *           }
 *           // ↓ your existing signup code stays exactly as it is ↓
 *           ...
 *         } catch (err) { ... }
 *       }
 *
 * 5) Deploy → Manage deployments → Edit (pencil) → New version → Deploy.
 *    The webhook URL in SITE.sheetsUrl stays the same.
 *
 * 6) Run the function `setupOnce` from the editor once to grant Mail + Trigger
 *    permissions (it does nothing else). Approve the OAuth prompts.
 *
 * Free Gmail caps MailApp at 100 sends/day. If a blast exceeds that, the rest
 * are queued and a one-time trigger sends them the next morning automatically.
 * Re-running notify for the same event id is a no-op (deduped via the
 * `Notifications` sheet, which this script auto-creates).
 */

// ── Configuration ────────────────────────────────────────────────────────────
var MEMBERS_SHEET_NAME    = 'Form responses 1';   // change if your members tab is named differently
var NOTIFICATIONS_SHEET   = 'Notifications';      // auto-created on first run
var FROM_NAME             = 'ALSA Auckland';
var REPLY_TO              = 'uoa.alsa2020@gmail.com';
var SITE_URL              = 'https://uoaalsa.com';   // used in email "View on website" link
var QUOTA_HEADROOM        = 5;                    // leave this many MailApp sends free for non-blast use
var NEXT_DAY_HOUR_NZ      = 9;                    // hour of day to resume sends (24h, script runs in script timezone)


// ── One-time setup helper (run from editor once to grant permissions) ────────
function setupOnce() {
  // Touch services to trigger OAuth consent so first real notify runs cleanly.
  MailApp.getRemainingDailyQuota();
  ScriptApp.getProjectTriggers();
  SpreadsheetApp.getActive();
  Logger.log('Permissions granted.');
}


// ── Notify entry point ──────────────────────────────────────────────────────
function handleNotify(event) {
  if (!event || !event.id) return { ok: false, error: 'event.id required' };

  var sheet = getOrCreateNotificationsSheet();
  var existing = findNotificationRow(sheet, event.id);

  if (existing && existing.status === 'complete') {
    return { ok: true, status: 'duplicate', eventId: event.id, message: 'Already sent for this event id.' };
  }

  var queue;
  var total;
  var alreadySent;
  var startedAt;

  if (existing && existing.status === 'partial') {
    var parsed = JSON.parse(existing.queueJson);
    queue = parsed.recipients || [];
    total = existing.total;
    alreadySent = existing.sent;
    startedAt = existing.startedAt || new Date();
  } else {
    queue = getOptedInMembers();
    total = queue.length;
    alreadySent = 0;
    startedAt = new Date();
    if (queue.length === 0) {
      writeNotificationRow(sheet, event.id, {
        title: event.title || '', total: 0, sent: 0, status: 'complete',
        queueJson: '[]', startedAt: startedAt, completedAt: new Date(),
      });
      return { ok: true, status: 'complete', sent: 0, total: 0, message: 'No opted-in members.' };
    }
  }

  var remainingQuota = MailApp.getRemainingDailyQuota();
  var canSend = Math.max(0, remainingQuota - QUOTA_HEADROOM);
  var batch = queue.slice(0, canSend);
  var leftover = queue.slice(canSend);

  var sentThisRun = 0;
  for (var i = 0; i < batch.length; i++) {
    try {
      sendEventEmail(batch[i], event);
      sentThisRun++;
    } catch (err) {
      Logger.log('Failed to send to ' + batch[i].email + ': ' + err);
    }
  }

  if (leftover.length > 0) {
    writeNotificationRow(sheet, event.id, {
      title: event.title || '',
      total: total,
      sent: alreadySent + sentThisRun,
      status: 'partial',
      queueJson: JSON.stringify({ event: event, recipients: leftover }),
      startedAt: startedAt,
      completedAt: '',
    });
    scheduleResumeTrigger();
    return {
      ok: true, status: 'partial', eventId: event.id,
      sentThisRun: sentThisRun,
      sentTotal: alreadySent + sentThisRun,
      remaining: leftover.length,
      total: total,
      message: 'Sent ' + sentThisRun + ' now, ' + leftover.length + ' queued for tomorrow morning (' + NEXT_DAY_HOUR_NZ + ':00).',
    };
  }

  writeNotificationRow(sheet, event.id, {
    title: event.title || '',
    total: total,
    sent: alreadySent + sentThisRun,
    status: 'complete',
    queueJson: '[]',
    startedAt: startedAt,
    completedAt: new Date(),
  });
  return {
    ok: true, status: 'complete', eventId: event.id,
    sent: alreadySent + sentThisRun, total: total,
  };
}


// ── Resume trigger (drains partial notifications next morning) ───────────────
function scheduleResumeTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'resumeNotifications') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  var next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(NEXT_DAY_HOUR_NZ, 0, 0, 0);
  ScriptApp.newTrigger('resumeNotifications').timeBased().at(next).create();
}

function resumeNotifications() {
  var sheet = getOrCreateNotificationsSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][NOTIF_COLS.status] === 'partial') {
      try {
        var parsed = JSON.parse(data[i][NOTIF_COLS.queueJson]);
        handleNotify(parsed.event);
      } catch (err) {
        Logger.log('resumeNotifications: row ' + (i + 1) + ' failed — ' + err);
      }
    }
  }
}


// ── Members lookup ───────────────────────────────────────────────────────────
function getOptedInMembers() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(MEMBERS_SHEET_NAME);
  if (!sheet) {
    Logger.log('Members sheet "' + MEMBERS_SHEET_NAME + '" not found.');
    return [];
  }
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var headers = data[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var emailCol = headers.indexOf('email');
  var optInCol = headers.indexOf('promooptin');
  var firstNameCol = headers.indexOf('firstname');
  if (emailCol < 0) {
    Logger.log('No "email" header found on members sheet.');
    return [];
  }
  if (optInCol < 0) {
    Logger.log('No "promoOptIn" header found on members sheet — add it manually.');
    return [];
  }

  var seen = {};
  var recipients = [];
  for (var i = 1; i < data.length; i++) {
    var email = String(data[i][emailCol] || '').trim().toLowerCase();
    if (!email || email.indexOf('@') < 0) continue;
    if (seen[email]) continue;
    var optIn = String(data[i][optInCol] || '').trim().toLowerCase();
    if (optIn !== 'yes' && optIn !== 'true') continue;
    seen[email] = true;
    recipients.push({
      email: email,
      firstName: firstNameCol >= 0 ? String(data[i][firstNameCol] || '').trim() : '',
    });
  }
  return recipients;
}


// ── Notifications sheet helpers ─────────────────────────────────────────────
var NOTIF_HEADERS = ['eventId', 'title', 'total', 'sent', 'status', 'queueJson', 'startedAt', 'completedAt'];
var NOTIF_COLS = {
  eventId: 0, title: 1, total: 2, sent: 3, status: 4, queueJson: 5, startedAt: 6, completedAt: 7,
};

function getOrCreateNotificationsSheet() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(NOTIFICATIONS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(NOTIFICATIONS_SHEET);
    sheet.getRange(1, 1, 1, NOTIF_HEADERS.length).setValues([NOTIF_HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, NOTIF_HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function findNotificationRow(sheet, eventId) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][NOTIF_COLS.eventId] === eventId) {
      return {
        row: i + 1,
        title: data[i][NOTIF_COLS.title],
        total: Number(data[i][NOTIF_COLS.total]) || 0,
        sent: Number(data[i][NOTIF_COLS.sent]) || 0,
        status: data[i][NOTIF_COLS.status],
        queueJson: data[i][NOTIF_COLS.queueJson],
        startedAt: data[i][NOTIF_COLS.startedAt],
        completedAt: data[i][NOTIF_COLS.completedAt],
      };
    }
  }
  return null;
}

function writeNotificationRow(sheet, eventId, fields) {
  var existing = findNotificationRow(sheet, eventId);
  var values = [
    eventId,
    fields.title || '',
    fields.total || 0,
    fields.sent || 0,
    fields.status || '',
    fields.queueJson || '',
    fields.startedAt || '',
    fields.completedAt || '',
  ];
  if (existing) {
    sheet.getRange(existing.row, 1, 1, values.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }
}


// ── Email rendering ─────────────────────────────────────────────────────────
function sendEventEmail(recipient, event) {
  var subject = 'New ALSA event: ' + (event.title || 'Update');
  MailApp.sendEmail({
    to: recipient.email,
    subject: subject,
    htmlBody: renderEventEmailHtml(recipient, event),
    body: renderEventEmailPlain(recipient, event),
    name: FROM_NAME,
    replyTo: REPLY_TO,
  });
}

function renderEventEmailHtml(recipient, event) {
  var greet = recipient.firstName ? escapeHtml(recipient.firstName) : 'there';
  var ticketed = !!event.eventbriteUrl;
  var ctaHtml = ticketed
    ? '<a href="' + escapeHtml(event.eventbriteUrl) + '" style="display:inline-block;padding:14px 30px;background:linear-gradient(135deg,#ffd24a 0%,#f5b800 50%,#d99a00 100%);color:#0d2660;text-decoration:none;border-radius:12px;font-family:Helvetica,Arial,sans-serif;font-weight:800;letter-spacing:0.4px;font-size:15px">🎟  Buy Tickets</a>'
    : '<a href="' + escapeHtml(SITE_URL + '/#events') + '" style="display:inline-block;padding:14px 30px;background:rgba(13,38,96,0.08);color:#0d2660;text-decoration:none;border-radius:12px;font-family:Helvetica,Arial,sans-serif;font-weight:800;letter-spacing:0.4px;font-size:15px;border:1px solid rgba(13,38,96,0.15)">View on website</a>';

  var ticketRow = '<tr><td style="padding:10px 0;font-size:14px;color:#4a5568;width:100px"><strong style="color:#0d2660">Entry</strong></td><td style="padding:10px 0;font-size:15px">' + (ticketed ? 'Ticketed via Eventbrite' : 'Free — no ticket required') + '</td></tr>';

  return '<!DOCTYPE html>' +
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;background:#f5f7fc;font-family:Helvetica,Arial,sans-serif;color:#0d2660">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fc;padding:40px 16px">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px -20px rgba(13,38,96,0.25)">' +
    '<tr><td style="padding:36px 40px 26px;background:linear-gradient(135deg,#0d2660 0%,#1a4099 100%)">' +
    '<div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ffd24a">ALSA Auckland · Event Announcement</div>' +
    '<div style="font-family:Georgia,serif;font-size:30px;font-weight:600;line-height:1.15;margin-top:12px;color:#ffffff">' + escapeHtml(event.title || 'New event') + '</div>' +
    '</td></tr>' +
    '<tr><td style="padding:32px 40px 8px;font-size:16px;line-height:1.65;color:#1a2540">' +
    '<p style="margin:0 0 18px">Hi ' + greet + ',</p>' +
    '<p style="margin:0 0 22px">There\'s a new event on the ALSA calendar — here are the details:</p>' +
    '<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin:0 0 24px;border-top:1px solid rgba(13,38,96,0.08)">' +
    '<tr><td style="padding:10px 0;font-size:14px;color:#4a5568;width:100px;border-bottom:1px solid rgba(13,38,96,0.08)"><strong style="color:#0d2660">Date</strong></td><td style="padding:10px 0;font-size:15px;border-bottom:1px solid rgba(13,38,96,0.08)">' + escapeHtml(event.date || '') + ' · ' + escapeHtml(event.time || '') + '</td></tr>' +
    '<tr><td style="padding:10px 0;font-size:14px;color:#4a5568;border-bottom:1px solid rgba(13,38,96,0.08)"><strong style="color:#0d2660">Where</strong></td><td style="padding:10px 0;font-size:15px;border-bottom:1px solid rgba(13,38,96,0.08)">' + escapeHtml(event.location || '') + '</td></tr>' +
    ticketRow +
    '</table>' +
    (event.description ? '<p style="margin:0 0 28px;color:#4a5568">' + escapeHtml(event.description) + '</p>' : '') +
    '<div style="text-align:center;margin:0 0 8px">' + ctaHtml + '</div>' +
    '</td></tr>' +
    '<tr><td style="padding:24px 40px 36px;border-top:1px solid rgba(13,38,96,0.08);font-size:12px;color:#7a8499;line-height:1.6">' +
    '<p style="margin:0 0 8px">You\'re getting this because you opted in to ALSA event emails when signing up.</p>' +
    '<p style="margin:0">Don\'t want these anymore? Reply with "unsubscribe" and we\'ll take you off the list. Questions? Reply directly — real humans on the other end.</p>' +
    '</td></tr>' +
    '</table>' +
    '</td></tr></table></body></html>';
}

function renderEventEmailPlain(recipient, event) {
  var greet = recipient.firstName || 'there';
  var lines = [
    'Hi ' + greet + ',',
    '',
    'New ALSA event: ' + (event.title || ''),
    '',
    'Date:  ' + (event.date || '') + ' ' + (event.time || ''),
    'Where: ' + (event.location || ''),
    'Entry: ' + (event.eventbriteUrl ? 'Ticketed via Eventbrite' : 'Free — no ticket required'),
    '',
    event.description || '',
    '',
    event.eventbriteUrl ? ('Buy tickets: ' + event.eventbriteUrl) : ('More info: ' + SITE_URL + '/#events'),
    '',
    '--',
    "You're getting this because you opted in to ALSA event emails. Reply with 'unsubscribe' to be removed.",
  ];
  return lines.join('\n');
}


// ── Helpers ─────────────────────────────────────────────────────────────────
function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
