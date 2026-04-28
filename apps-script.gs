/**
 * ALSA Website — Apps Script (complete handler)
 *
 * Handles two kinds of POST requests from the website:
 *   1. Membership sign-ups  → appends a row to the Members sheet + sends a
 *      confirmation email to the new member.
 *   2. Event notify blasts  → emails all opted-in members about a new event.
 *
 * SETUP (one-time)
 * ────────────────
 * 1. script.google.com → open the project bound to your Members sheet.
 * 2. Replace ALL code in Code.gs with this file.
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the /exec URL and paste it into SITE.sheetsUrl in src/data/site.js.
 * 4. Run `setupOnce` from the Apps Script editor to grant OAuth permissions.
 *
 * Sheet layout (auto-created if missing, or add columns manually):
 *   Timestamp | First Name | Last Name | Email | At UoA | UPI | Student ID (UoA) |
 *   Field (UoA) | Year (UoA) | Continuing 2027 | Paid (UoA) |
 *   University (Other) | Student ID (Other) | Field (Other) | Year (Other) | Paid (Other) |
 *   Phone | Membership | Promo Opt-In | Payment Status | Stripe PI
 */

// ── Configuration ────────────────────────────────────────────────────────────
var MEMBERS_SHEET_NAME    = 'Form responses 1';   // change if your members tab is named differently
var NOTIFICATIONS_SHEET   = 'Notifications';      // auto-created on first run
var FROM_NAME             = 'ALSA Auckland';
var REPLY_TO              = 'uoa.alsa2020@gmail.com';
var SITE_URL              = 'https://uoaalsa.com';   // used in email "View on website" link
var QUOTA_HEADROOM        = 5;                    // leave this many MailApp sends free for non-blast use
var NEXT_DAY_HOUR_NZ      = 9;                    // hour of day to resume sends (24h, script runs in script timezone)

// Sheet column order — must match the header row in MEMBERS_SHEET_NAME.
// If your sheet already has different headers, reorder this array to match.
var SIGNUP_COLUMNS = [
  'Timestamp', 'First Name', 'Last Name', 'Email', 'At UoA',
  'UPI', 'Student ID (UoA)', 'Field (UoA)', 'Year (UoA)', 'Continuing 2027', 'Paid (UoA)',
  'University (Other)', 'Student ID (Other)', 'Field (Other)', 'Year (Other)', 'Paid (Other)',
  'Phone', 'Membership', 'Promo Opt-In', 'Payment Status', 'Stripe PI',
];


// ── One-time setup helper (run from editor once to grant permissions) ────────
function setupOnce() {
  // Touch services to trigger OAuth consent so first real notify runs cleanly.
  MailApp.getRemainingDailyQuota();
  ScriptApp.getProjectTriggers();
  SpreadsheetApp.getActive();
  Logger.log('Permissions granted.');
}


// ── Main entry point ─────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // Route event-blast notify requests separately.
    if (body.action === 'notify') {
      return jsonOut(handleNotify(body.event));
    }

    // ── Membership sign-up ──────────────────────────────────────────────────
    var sheet = getOrCreateMembersSheet();

    var row = [
      body.timestamp        || new Date().toLocaleString('en-NZ'),
      body.firstName        || '',
      body.lastName         || '',
      body.email            || '',
      body.atUoA            || '',
      body.upi              || '',
      body.universityId     || '',   // UoA student ID (also reused for Other)
      body.fieldUoA         || '',
      body.yearUoA          || '',
      body.continuing2027   || '',
      body.paidUoA          || '',
      body.universityOther  || '',
      body.universityIdOther || '',
      body.fieldOther       || '',
      body.yearOther        || '',
      body.paidOther        || '',
      body.phone            || '',
      body.membership       || '',
      body.promoOptIn       || 'No',
      body.paymentStatus    || '',
      body.stripePaymentIntentId || '',
    ];

    sheet.appendRow(row);

    // Send confirmation email to the new member.
    if (body.email) {
      try {
        sendConfirmationEmail(body);
      } catch (mailErr) {
        Logger.log('Confirmation email failed: ' + mailErr);
      }
    }

    return jsonOut({ ok: true });
  } catch (err) {
    Logger.log('doPost error: ' + err);
    return jsonOut({ ok: false, error: String(err) });
  }
}

// Also handle GET so a browser visit to the URL shows something helpful.
function doGet() {
  return ContentService.createTextOutput('ALSA Apps Script is running.');
}


// ── Members sheet ─────────────────────────────────────────────────────────────
function getOrCreateMembersSheet() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(MEMBERS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(MEMBERS_SHEET_NAME);
    sheet.getRange(1, 1, 1, SIGNUP_COLUMNS.length).setValues([SIGNUP_COLUMNS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, SIGNUP_COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}


// ── Confirmation email ────────────────────────────────────────────────────────
function sendConfirmationEmail(data) {
  var firstName = data.firstName || 'there';
  var isFull    = (data.membership || '').toLowerCase().indexOf('full') >= 0;
  var subject   = "You're in, " + firstName + "! Welcome to ALSA \uD83E\uDD81";

  MailApp.sendEmail({
    to:       data.email,
    subject:  subject,
    htmlBody: renderConfirmationHtml(data, firstName, isFull),
    body:     renderConfirmationPlain(data, firstName, isFull),
    name:     FROM_NAME,
    replyTo:  REPLY_TO,
  });
}

function renderConfirmationHtml(data, firstName, isFull) {
  var fullName      = escapeHtml((data.firstName || '') + ' ' + (data.lastName || ''));
  var logoUrl       = SITE_URL + '/logo-lion.png';
  var memberBadge   = isFull
    ? '<span style="display:inline-block;padding:4px 14px;background:linear-gradient(135deg,#ffd24a,#d99a00);color:#0d2660;border-radius:20px;font-size:12px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase">Full Member</span>'
    : '<span style="display:inline-block;padding:4px 14px;background:#e8edf8;color:#0d2660;border-radius:20px;font-size:12px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase">Social Member</span>';

  var paymentBlock = isFull
    ? '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:28px 0">' +
      '<tr><td style="background:#fffbea;border:1px solid #f5d800;border-radius:12px;padding:18px 22px">' +
      '<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#8a6a00;text-transform:uppercase;letter-spacing:0.5px">Payment received</p>' +
      '<p style="margin:0;font-size:15px;color:#5a4500">Your NZD $10 membership fee has been processed through Stripe. A receipt from Stripe will arrive in your inbox separately.</p>' +
      '</td></tr></table>'
    : '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:28px 0">' +
      '<tr><td style="background:#f0f4ff;border:1px solid #c7d4f5;border-radius:12px;padding:18px 22px">' +
      '<p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#2a45a0;text-transform:uppercase;letter-spacing:0.5px">All good, no payment needed</p>' +
      '<p style="margin:0;font-size:15px;color:#2a45a0">Social Membership is completely free. You are officially part of the community.</p>' +
      '</td></tr></table>';

  return '<!DOCTYPE html>' +
    '<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">' +
    '<title>Welcome to ALSA</title></head>' +
    '<body style="margin:0;padding:0;background:#edf0f8;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased">' +

    // Outer wrapper
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#edf0f8">' +
    '<tr><td align="center" style="padding:40px 16px 48px">' +

    // Email card
    '<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%">' +

    // ── Logo strip (navy) ──────────────────────────────────────────────────
    '<tr><td align="center" style="background:#0d2660;padding:28px 40px;border-radius:16px 16px 0 0">' +
    '<table role="presentation" cellspacing="0" cellpadding="0"><tr>' +
    '<td valign="middle" style="padding-right:14px">' +
    '<img src="' + logoUrl + '" width="44" height="44" alt="ALSA Lion" style="display:block;border:0;width:44px;height:44px;object-fit:contain" />' +
    '</td>' +
    '<td valign="middle">' +
    '<div style="font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#f5b800;line-height:1">ALSA Auckland</div>' +
    '<div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-top:3px">Auckland Lankan Students Association</div>' +
    '</td>' +
    '</tr></table>' +
    '</td></tr>' +

    // ── Gold divider line ──────────────────────────────────────────────────
    '<tr><td style="background:linear-gradient(90deg,#f5b800 0%,#ffd24a 50%,#f5b800 100%);height:3px;font-size:0;line-height:0">&nbsp;</td></tr>' +

    // ── Hero section ───────────────────────────────────────────────────────
    '<tr><td style="background:linear-gradient(160deg,#0d2660 0%,#0f3080 60%,#1a4099 100%);padding:44px 40px 40px">' +
    '<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(245,184,0,0.75)">Membership Confirmed</p>' +
    '<h1 style="margin:0;font-family:Georgia,\'Times New Roman\',serif;font-size:34px;font-weight:700;line-height:1.2;color:#ffffff">You\'re officially part<br>of the family, ' + escapeHtml(firstName) + '.</h1>' +
    '</td></tr>' +

    // ── White body ─────────────────────────────────────────────────────────
    '<tr><td style="background:#ffffff;padding:40px 40px 8px">' +

    '<p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#1a2540">Hey ' + escapeHtml(firstName) + ',</p>' +
    '<p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#1a2540">Your membership is confirmed and we are genuinely stoked to have you with us. ALSA has been bringing Auckland\'s Sri Lankan students together since 2020 and this year is shaping up to be the best one yet. Glad you made it.</p>' +

    // Membership detail card
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:32px 0 0;border:1.5px solid #e2e8f0;border-radius:14px;overflow:hidden">' +
    '<tr><td style="background:#f8f9fc;padding:14px 20px;border-bottom:1.5px solid #e2e8f0">' +
    '<p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8898aa">Your membership details</p>' +
    '</td></tr>' +
    '<tr><td style="padding:0 20px">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' +

    '<tr><td style="padding:16px 0;border-bottom:1px solid #f0f2f8;width:110px;font-size:13px;font-weight:700;color:#8898aa;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">Name</td>' +
    '<td style="padding:16px 0;border-bottom:1px solid #f0f2f8;font-size:15px;color:#1a2540;font-weight:600">' + fullName + '</td></tr>' +

    '<tr><td style="padding:16px 0;border-bottom:1px solid #f0f2f8;font-size:13px;font-weight:700;color:#8898aa;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top">Email</td>' +
    '<td style="padding:16px 0;border-bottom:1px solid #f0f2f8;font-size:15px;color:#1a2540">' + escapeHtml(data.email || '') + '</td></tr>' +

    '<tr><td style="padding:16px 0;font-size:13px;font-weight:700;color:#8898aa;text-transform:uppercase;letter-spacing:0.5px;vertical-align:middle">Tier</td>' +
    '<td style="padding:16px 0;vertical-align:middle">' + memberBadge + '</td></tr>' +

    '</table></td></tr></table>' +

    paymentBlock +

    '<p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#1a2540">We have got a packed calendar this year with cultural events, sport, social nights and everything in between. Keep an eye on your inbox and on our Instagram for what is coming up next.</p>' +

    // CTA button
    '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 40px">' +
    '<tr><td align="center" style="border-radius:12px;background:linear-gradient(135deg,#ffd24a 0%,#f5b800 55%,#d99a00 100%)">' +
    '<a href="' + escapeHtml(SITE_URL) + '" style="display:inline-block;padding:16px 36px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:800;color:#0d2660;text-decoration:none;letter-spacing:0.3px;border-radius:12px">See what\'s coming up \u2192</a>' +
    '</td></tr></table>' +

    '</td></tr>' +

    // ── Footer ─────────────────────────────────────────────────────────────
    '<tr><td style="background:#f8f9fc;padding:28px 40px 32px;border-top:1.5px solid #e2e8f0;border-radius:0 0 16px 16px">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>' +
    '<td style="font-size:13px;color:#8898aa;line-height:1.65">' +
    '<p style="margin:0 0 6px">Any questions at all, just hit reply. We actually read them.</p>' +
    '<p style="margin:0 0 16px">See you at the next event!</p>' +
    '<p style="margin:0;font-weight:700;color:#4a5568">The ALSA Team</p>' +
    '</td>' +
    '<td align="right" valign="top">' +
    '<img src="' + logoUrl + '" width="36" height="36" alt="ALSA" style="display:block;border:0;opacity:0.35" />' +
    '</td>' +
    '</tr></table>' +
    '<p style="margin:20px 0 0;font-size:11px;color:#b0bcd0;line-height:1.6">' +
    'You received this because you signed up through <a href="' + escapeHtml(SITE_URL) + '" style="color:#b0bcd0">' + SITE_URL + '</a>. ' +
    'To unsubscribe from future event emails, just reply with "unsubscribe" and we\'ll sort it.' +
    '</p>' +
    '</td></tr>' +

    '</table>' + // email card
    '</td></tr></table>' + // outer wrapper
    '</body></html>';
}

function renderConfirmationPlain(data, firstName, isFull) {
  var fullName = (data.firstName || '') + ' ' + (data.lastName || '');
  var lines = [
    "You're in, " + firstName + "! Welcome to ALSA.",
    '',
    'Hey ' + firstName + ',',
    '',
    'Your membership is confirmed and we are genuinely stoked to have you with us. ALSA has been bringing Auckland\'s Sri Lankan students together since 2020 and this year is shaping up to be the best one yet.',
    '',
    'YOUR MEMBERSHIP DETAILS',
    'Name:       ' + fullName,
    'Email:      ' + (data.email || ''),
    'Membership: ' + (isFull ? 'Full Member (NZD $10/year)' : 'Social Member (Free)'),
    '',
    isFull
      ? 'Your NZD $10 membership fee has been processed through Stripe. A receipt from Stripe will arrive in your inbox separately.'
      : 'Social Membership is completely free. You are officially part of the community.',
    '',
    'We have got a packed calendar this year with cultural events, sport, social nights and everything in between. Keep an eye on your inbox.',
    '',
    'See what\'s coming up: ' + SITE_URL,
    '',
    'Any questions, just hit reply. We actually read them.',
    'See you at the next event!',
    '',
    'The ALSA Team',
    SITE_URL,
    '',
    'You received this because you signed up at ' + SITE_URL + '. Reply with "unsubscribe" to opt out of future event emails.',
  ];
  return lines.join('\n');
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
