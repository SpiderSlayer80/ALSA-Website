// notify.js — push event announcements to opted-in members via Apps Script.
//
// Run from alsa-react/:  npm run notify
//
// Picks up every event in src/data/site.js with `notifyMembers: true` and
// POSTs each to the Apps Script webhook (SITE.sheetsUrl). Apps Script dedupes
// by event id, so re-running after a successful blast is a safe no-op.
//
// Requires Node 18+ (uses native fetch + top-level await).

import { readFileSync } from 'node:fs';
import { EVENTS, SITE } from '../src/data/site.js';

const ENDPOINT = SITE.sheetsUrl;
if (!ENDPOINT) {
  console.error('SITE.sheetsUrl is empty in src/data/site.js — nothing to call.');
  process.exit(1);
}

// The Apps Script notify route is token-protected (NOTIFY_TOKEN script property).
// Read the matching token from the environment or .env.local — never commit it.
const TOKEN = process.env.NOTIFY_TOKEN || readEnvLocal('NOTIFY_TOKEN');
if (!TOKEN) {
  console.error('NOTIFY_TOKEN is not set. Add NOTIFY_TOKEN=... to .env.local (same value');
  console.error('as the NOTIFY_TOKEN script property in the Apps Script project).');
  process.exit(1);
}

function readEnvLocal(key) {
  try {
    const lines = readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n');
    for (const line of lines) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] === key) return m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
  return '';
}

const targets = EVENTS.filter(e => e.notifyMembers === true);
if (targets.length === 0) {
  console.log('No events have notifyMembers: true. Set the flag on an event and re-run.');
  process.exit(0);
}

const missingId = targets.filter(e => !e.id);
if (missingId.length > 0) {
  console.error('These events are missing an `id` (required for dedupe):');
  missingId.forEach(e => console.error('  - ' + (e.title || '(untitled)')));
  process.exit(1);
}

console.log(`Found ${targets.length} event(s) flagged for notification:\n`);
for (const ev of targets) {
  console.log(`  - ${ev.title}  [${ev.id}]`);
}
console.log();

let hadError = false;
for (const ev of targets) {
  process.stdout.write(`> ${ev.title} ... `);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'notify', token: TOKEN, event: pickEventFields(ev) }),
    });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = null; }

    if (!res.ok || !data || data.ok === false) {
      hadError = true;
      console.log(`FAIL (HTTP ${res.status})`);
      console.log('   ' + (data ? JSON.stringify(data) : text.slice(0, 400)));
      continue;
    }

    if (data.status === 'duplicate') {
      console.log('already sent — skipped');
    } else if (data.status === 'partial') {
      console.log(`partial: sent ${data.sentThisRun} now, ${data.remaining} queued for tomorrow morning (Apps Script trigger handles it)`);
    } else if (data.status === 'complete') {
      console.log(`sent to ${data.sent} member(s)`);
    } else {
      console.log(JSON.stringify(data));
    }
  } catch (err) {
    hadError = true;
    console.log('FAIL (' + err.message + ')');
  }
}

console.log(hadError ? '\nFinished with errors.' : '\nDone.');
process.exit(hadError ? 1 : 0);

function pickEventFields(ev) {
  return {
    id: ev.id,
    title: ev.title,
    date: ev.date,
    time: ev.time,
    location: ev.location,
    description: ev.description,
    eventbriteUrl: ev.eventbriteUrl || '',
  };
}
