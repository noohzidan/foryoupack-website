/**
 * POST /api/quote — receives the quote-request form and emails it to sales.
 *
 * Runs on the Vercel Node runtime (nodemailer needs net/tls, so this cannot be
 * an Edge function). Order matters and is deliberate:
 *
 *   spam checks → validation → notification → confirmation
 *
 * The notification to sales is the only thing we truly depend on. The customer
 * confirmation is best-effort: if it fails we still report success, because the
 * request did reach sales.
 *
 * Response contract: { ok: true } | { ok: false, error: "<code>" }.
 * SMTP and environment details are logged server-side and never returned.
 */
import nodemailer from 'nodemailer';
import { z } from 'zod';
import translations from '../src/i18n/translations.js';
import { SECTOR_KEYS, sectorI18nKey } from '../src/shared/sectors.js';

/* ── Configuration (env only — never hardcode credentials) ─────────────── */

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.zoho.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || 'sales@forucarton.com';
const SMTP_PASS = process.env.SMTP_PASS || '';
const MAIL_TO   = process.env.MAIL_TO   || 'sales@forucarton.com';
const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER;

const BRAND_AR = 'شركة فوريو للكرتون';
const PRIMARY_PHONE = '+201287365399';

/* Rows in the notification email are always Arabic — the recipient is the
 * Arabic-speaking sales team. The visitor's own language is reported as a row. */

/* ── Tuning ─────────────────────────────────────────────────────────────── */

const MIN_FILL_MS = 2500;                    // faster than this is not a human
const MAX_NOTIFY_PER_IP_PER_HOUR = 5;
const MAX_CONFIRM_PER_EMAIL_PER_DAY = 1;
const MAX_CONFIRM_PER_IP_PER_HOUR = 3;

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/* Trivial disposable-domain blocklist. Deliberately tiny — this is a nicety,
 * not a security control, and adding a real list would mean a dependency. */
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'temp-mail.org', '10minutemail.com',
  'guerrillamail.com', 'sharklasers.com', 'yopmail.com', 'trashmail.com',
  'throwawaymail.com', 'getnada.com', 'maildrop.cc', 'dispostable.com',
]);

/* ── Rate limiting ──────────────────────────────────────────────────────── */
/* Kept on globalThis so counters survive across invocations of a warm
 * serverless instance. This is BEST-EFFORT ONLY: Vercel may run many
 * concurrent instances, each with its own memory, so a determined client can
 * exceed these limits. It blunts casual abuse, it is not a guarantee. */

const store = (globalThis.__fypQuoteRateLimit ||= {
  notifyByIp: new Map(),
  confirmByEmail: new Map(),
  confirmByIp: new Map(),
});

function prune(map, key, windowMs) {
  const now = Date.now();
  const times = (map.get(key) || []).filter((t) => now - t < windowMs);
  map.set(key, times);
  return times;
}

/** True when `key` is still under `limit` within the window. Does not consume. */
function underLimit(map, key, limit, windowMs) {
  return prune(map, key, windowMs).length < limit;
}

/** Record one hit for `key`. */
function recordHit(map, key, windowMs) {
  const times = prune(map, key, windowMs);
  times.push(Date.now());
  map.set(key, times);
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** Escape for interpolation into HTML text or attribute values. */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/** Collapse CR/LF — anything destined for a header or subject must pass here. */
function stripCrlf(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

/** Egyptian numbers: a leading 0 becomes the 20 country code. */
function waDigits(phone) {
  const digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('0')) return `20${digits.slice(1)}`;
  return digits;
}

function formatCairo(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'Africa/Cairo',
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function label(lang, key) {
  return translations[lang]?.[key] ?? translations.en?.[key] ?? key;
}

function clientIp(req) {
  const header = req.headers['x-forwarded-for'];
  const raw = Array.isArray(header) ? header[0] : header || '';
  return String(raw).split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

function isDisposable(email) {
  const domain = String(email).split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

/** Parse a JSON body whether Vercel pre-parsed it or handed us a raw string. */
function parseBody(req) {
  const raw = req.body;
  if (raw && typeof raw === 'object') return raw;
  if (typeof raw === 'string' && raw.length) {
    try { return JSON.parse(raw); } catch { return null; }
  }
  return null;
}

/* ── Email shell ────────────────────────────────────────────────────────── */

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,Arial,sans-serif";

function shell({ lang, dir, heading, bodyHtml, footerNote, accent = '#0f4c81' }) {
  return `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;font-family:${FONT};">
<tr><td style="background:${accent};padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700;text-align:${dir === 'rtl' ? 'right' : 'left'};">${escapeHtml(heading)}</td></tr>
<tr><td style="padding:24px;color:#1a1a1a;font-size:15px;line-height:1.7;">${bodyHtml}</td></tr>
<tr><td style="padding:16px 24px;background:#fafafa;color:#8a8a8a;font-size:12px;text-align:center;border-top:1px solid #ececec;">${escapeHtml(footerNote)}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(labelText, valueHtml, dir) {
  const align = dir === 'rtl' ? 'right' : 'left';
  return `<tr>
<td style="padding:10px 12px;border-bottom:1px solid #ececec;background:#fafafa;font-weight:600;color:#555;width:38%;vertical-align:top;text-align:${align};">${escapeHtml(labelText)}</td>
<td style="padding:10px 12px;border-bottom:1px solid #ececec;color:#111;vertical-align:top;text-align:${align};word-break:break-word;">${valueHtml}</td>
</tr>`;
}

/* ── Notification email (to sales) ──────────────────────────────────────── */

function buildNotification(data, submittedAt) {
  const ar = translations.ar;
  const dir = 'rtl';
  const tel = `tel:+${waDigits(data.phone)}`;
  const wa = `https://wa.me/${waDigits(data.phone)}`;
  const sector = label('ar', sectorI18nKey(data.sector));
  const cairo = formatCairo(submittedAt, 'ar-EG');
  const langText = data.lang === 'ar' ? ar.quoteMetaLangAr : ar.quoteMetaLangEn;

  const details = escapeHtml(data.message).replace(/\r?\n/g, '<br>');
  const emailCell = data.email
    ? `<a href="mailto:${escapeHtml(data.email)}" dir="ltr" style="color:#0f4c81;text-decoration:none;">${escapeHtml(data.email)}</a>`
    : `<span style="color:#999;">${escapeHtml(ar.quoteMetaNoEmail)}</span>`;

  const rows = [
    row(ar.formName, escapeHtml(data.name), dir),
    row(ar.formCompany, escapeHtml(data.company), dir),
    row(ar.formPhone, `<a href="${tel}" dir="ltr" style="color:#0f4c81;text-decoration:none;font-weight:600;">${escapeHtml(data.phone)}</a>`, dir),
    row(ar.formIndustry, escapeHtml(sector), dir),
    row(ar.formMessage, details, dir),
    row(ar.quoteMetaEmail, emailCell, dir),
    row(ar.quoteMetaLang, escapeHtml(langText), dir),
    row(ar.quoteMetaTime, `${escapeHtml(cairo)} <span style="color:#999;">(${escapeHtml(ar.quoteMetaTimeZone)})</span>`, dir),
  ].join('');

  const bodyHtml = `
<p style="margin:0 0 16px;">${escapeHtml(ar.quoteNewRequestIntro)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #ececec;border-radius:8px;overflow:hidden;">${rows}</table>
<p style="margin:20px 0 0;text-align:center;">
<a href="${wa}" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;font-size:15px;">${escapeHtml(ar.quoteReplyWa)}</a>
</p>`;

  const text = [
    ar.quoteNewRequestIntro,
    '',
    `${ar.formName}: ${data.name}`,
    `${ar.formCompany}: ${data.company}`,
    `${ar.formPhone}: ${data.phone}`,
    `${ar.formIndustry}: ${sector}`,
    `${ar.formMessage}:`,
    data.message,
    '',
    `${ar.quoteMetaEmail}: ${data.email || ar.quoteMetaNoEmail}`,
    `${ar.quoteMetaLang}: ${langText}`,
    `${ar.quoteMetaTime}: ${cairo} (${ar.quoteMetaTimeZone})`,
    '',
    `${ar.quoteReplyWa}: ${wa}`,
  ].join('\n');

  const subject = `طلب عرض سعر جديد — ${stripCrlf(data.company)} — ${stripCrlf(sector)}`;

  return {
    from: displayFrom(),
    to: MAIL_TO,
    subject,
    /* Only set Reply-To when the visitor actually gave us an address. */
    ...(data.email ? { replyTo: stripCrlf(data.email) } : {}),
    text,
    html: shell({
      lang: 'ar',
      dir: 'rtl',
      heading: `${BRAND_AR} — طلب عرض سعر جديد`,
      bodyHtml,
      footerNote: ar.quoteAutoNote,
    }),
  };
}

/* ── Confirmation email (to the customer) ───────────────────────────────── */

function buildConfirmation(data, submittedAt) {
  const lang = data.lang === 'ar' ? 'ar' : 'en';
  const tr = translations[lang];
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  /* Fixed template only. The name is the sole user-supplied value here, and it
   * is escaped, newline-stripped and length-capped before it goes anywhere. */
  const safeName = escapeHtml(stripCrlf(data.name).slice(0, 60));
  const tel = `tel:${PRIMARY_PHONE}`;
  const wa = `https://wa.me/${waDigits(PRIMARY_PHONE)}`;
  const cairo = formatCairo(submittedAt, lang === 'ar' ? 'ar-EG' : 'en-GB');

  const bodyHtml = `
<p style="margin:0 0 14px;font-weight:600;">${escapeHtml(tr.confirmGreeting)} ${safeName}${lang === 'ar' ? '،' : ','}</p>
<p style="margin:0 0 14px;">${escapeHtml(tr.confirmBodyReceived)}</p>
<p style="margin:0 0 20px;">${escapeHtml(tr.confirmBodyTimeline)}</p>
<p style="margin:0 0 6px;font-weight:600;">${escapeHtml(tr.confirmBodyContact)}</p>
<p style="margin:0 0 4px;"><a href="${tel}" dir="ltr" style="color:#0f4c81;text-decoration:none;font-weight:700;">${escapeHtml(PRIMARY_PHONE)}</a></p>
<p style="margin:0 0 20px;"><a href="${wa}" dir="ltr" style="color:#0f4c81;text-decoration:none;">WhatsApp</a></p>
<p style="margin:0;color:#8a8a8a;font-size:13px;">${escapeHtml(tr.confirmBodyStamp)} ${escapeHtml(cairo)}</p>`;

  const text = [
    `${tr.confirmGreeting} ${stripCrlf(data.name).slice(0, 60)}${lang === 'ar' ? '،' : ','}`,
    '',
    tr.confirmBodyReceived,
    tr.confirmBodyTimeline,
    '',
    tr.confirmBodyContact,
    PRIMARY_PHONE,
    `${tr.quoteReplyWa}: ${wa}`,
    '',
    `${tr.confirmBodyStamp} ${cairo}`,
    tr.confirmAutoNote,
  ].join('\n');

  return {
    from: displayFrom(),
    to: data.email,
    subject: stripCrlf(tr.confirmSubject),
    text,
    html: shell({
      lang,
      dir,
      heading: tr.confirmHeading,
      bodyHtml,
      footerNote: tr.confirmAutoNote,
      accent: '#0f4c81',
    }),
  };
}

/** `MAIL_FROM` may already carry a display name — don't double-wrap it. */
function displayFrom() {
  return MAIL_FROM.includes('<') ? MAIL_FROM : `"${BRAND_AR}" <${MAIL_FROM}>`;
}

/* ── Transport ──────────────────────────────────────────────────────────── */

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

/* ── Validation ─────────────────────────────────────────────────────────── */

/* Literal space, not \s — \s also matches CR/LF, which would let a newline
 * ride along inside a "valid" phone number. */
const PHONE_RE = /^[0-9+ -]{8,20}$/;

const schema = z.object({
  name:    z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(120),
  phone:   z.string().trim().max(30).regex(PHONE_RE),
  sector:  z.enum(SECTOR_KEYS),
  message: z.string().trim().min(1).max(3000),
  /* Normalise before validating: z.email() would reject a padded address, so
   * trim and lowercase in preprocess rather than in a post-validate transform. */
  email: z.preprocess(
    (v) => {
      if (typeof v !== 'string') return v;
      const trimmed = v.trim();
      return trimmed === '' ? undefined : trimmed.toLowerCase();
    },
    z.email().max(254).optional(),
  ),
  lang: z.enum(['ar', 'en']).default('ar'),
});

/** Reduce zod issues to `{ field: "invalid" }` — codes only, no internals. */
function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path?.[0];
    if (typeof key === 'string' && !out[key]) out[key] = 'invalid';
  }
  return out;
}

/* ── Confirmation dispatch ──────────────────────────────────────────────── */

/** @returns {Promise<boolean>} whether a confirmation was actually sent. */
async function maybeSendConfirmation(data, ip, submittedAt) {
  if (!data.email) return false;
  /* A disposable address is not worth burning quota on — but we still deliver
   * the lead to sales rather than rejecting it. */
  if (isDisposable(data.email)) return false;
  if (!underLimit(store.confirmByEmail, data.email, MAX_CONFIRM_PER_EMAIL_PER_DAY, DAY)) return false;
  if (!underLimit(store.confirmByIp, ip, MAX_CONFIRM_PER_IP_PER_HOUR, HOUR)) return false;

  try {
    await getTransporter().sendMail(buildConfirmation(data, submittedAt));
  } catch (err) {
    console.error('[quote] confirmation send failed:', err);
    return false;
  }

  recordHit(store.confirmByEmail, data.email, DAY);
  recordHit(store.confirmByIp, ip, HOUR);
  return true;
}

/* ── Handler ────────────────────────────────────────────────────────────── */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = parseBody(req);
  if (!body) {
    return res.status(400).json({ ok: false, error: 'bad_request' });
  }

  /* 1 — Honeypot. A real visitor never sees this field, so anything in it is a
   * bot. Answer exactly like a success so the bot learns nothing. */
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  /* 2 — Time-to-submit. Absent or implausibly fast counts as a bot. */
  const renderedAt = Number(body.renderedAt);
  if (!Number.isFinite(renderedAt) || Date.now() - renderedAt < MIN_FILL_MS) {
    return res.status(200).json({ ok: true });
  }

  /* 3 — Per-IP throttle. Consumed on attempt, not on success, so failures
   * still count against an abusive client. */
  const ip = clientIp(req);
  if (!underLimit(store.notifyByIp, ip, MAX_NOTIFY_PER_IP_PER_HOUR, HOUR)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }
  recordHit(store.notifyByIp, ip, HOUR);

  /* 4 — Validation. */
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'validation',
      fields: fieldErrors(parsed.error),
    });
  }
  const data = parsed.data;
  const submittedAt = new Date();

  /* 5 — Notify sales. This is the only unrecoverable step. */
  try {
    await getTransporter().sendMail(buildNotification(data, submittedAt));
  } catch (err) {
    console.error('[quote] notification send failed:', err);
    return res.status(500).json({ ok: false, error: 'send_failed' });
  }

  /* 6 — Confirm to the customer, best-effort. Rate limits are silent here:
   * hitting one must never stop the lead reaching sales. */
  const confirmationSent = await maybeSendConfirmation(data, ip, submittedAt);

  return res.status(200).json({ ok: true, confirmationSent });
}

/* Vercel's Node runtime passes parsed JSON bodies already, but a raw string is
 * possible — parseBody above covers both. */
export const config = { api: { bodyParser: true } };
