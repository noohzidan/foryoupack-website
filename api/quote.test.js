/**
 * Tests for the /api/quote handler.
 *
 * The nodemailer transport is mocked throughout — these tests must never open
 * a real SMTP connection or send mail.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import handler from './quote.js';

const { sendMail } = vi.hoisted(() => ({ sendMail: vi.fn() }));

vi.mock('nodemailer', () => ({
  default: { createTransport: () => ({ sendMail }) },
}));

/* ── Fixtures ───────────────────────────────────────────────────────────── */

const BASE = {
  name: 'أحمد محمد',
  company: 'شركة النور للتغليف',
  phone: '01287365399',
  sector: 'food',
  message: 'نحتاج 1000 كرتون مقاس 40×30×30',
  lang: 'ar',
  website: '',
};

/** A payload that passes every gate (time check included). */
function payload(overrides = {}) {
  return { ...BASE, renderedAt: Date.now() - 10_000, ...overrides };
}

function makeReq(body, { ip = '203.0.113.10', method = 'POST' } = {}) {
  return { method, body, headers: { 'x-forwarded-for': ip }, socket: {} };
}

function makeRes() {
  const res = { statusCode: null, body: null };
  res.status = vi.fn((code) => { res.statusCode = code; return res; });
  res.json = vi.fn((payload) => { res.body = payload; return res; });
  return res;
}

async function call(body, opts) {
  const res = makeRes();
  await handler(makeReq(body, opts), res);
  return res;
}

/** The mail objects passed to the transport, in order. */
const mails = () => sendMail.mock.calls.map(([mail]) => mail);

beforeEach(() => {
  sendMail.mockReset();
  sendMail.mockResolvedValue({ messageId: 'test-id' });

  /* The rate-limit store lives on globalThis so it survives warm invocations —
   * reset it so tests can't leak counters into each other. */
  const store = globalThis.__fypQuoteRateLimit;
  store.notifyByIp.clear();
  store.confirmByEmail.clear();
  store.confirmByIp.clear();
});

/* ── Happy path ─────────────────────────────────────────────────────────── */

describe('notification', () => {
  it('sends only the notification when no email is provided', async () => {
    const res = await call(payload());

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, confirmationSent: false });
    expect(sendMail).toHaveBeenCalledTimes(1);

    const mail = mails()[0];
    expect(mail.to).toBe('sales@forucarton.com');
    expect(mail.replyTo).toBeUndefined();
  });

  it('includes the order details as an Arabic RTL email', async () => {
    await call(payload());

    const mail = mails()[0];
    expect(mail.html).toContain('dir="rtl"');
    expect(mail.html).toContain('lang="ar"');
    expect(mail.html).toContain('1000 كرتون');
    expect(mail.text).toContain('1000 كرتون');
  });

  it('normalizes a leading 0 to the 20 country code for call/WhatsApp links', async () => {
    await call(payload({ phone: '01287365399' }));

    const { html } = mails()[0];
    expect(html).toContain('https://wa.me/201287365399');
    expect(html).toContain('tel:+201287365399');
  });

  it('escapes HTML in visitor-supplied input', async () => {
    await call(payload({ name: '<script>alert(1)</script>' }));

    const { html } = mails()[0];
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

/* ── Confirmation ───────────────────────────────────────────────────────── */

describe('confirmation email', () => {
  it('sends a second mail when an email is provided, trimming and lowercasing it', async () => {
    const res = await call(payload({ email: '  Customer@Example.COM  ' }));

    expect(res.statusCode).toBe(200);
    expect(res.body.confirmationSent).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(2);

    const [notification, confirmation] = mails();
    expect(notification.replyTo).toBe('customer@example.com');
    expect(confirmation.to).toBe('customer@example.com');
  });

  it('keeps visitor free-text out of the confirmation template', async () => {
    await call(payload({ email: 'c@example.com', message: 'SECRET-ORDER-DETAILS' }));

    const confirmation = mails()[1];
    expect(confirmation.html).not.toContain('SECRET-ORDER-DETAILS');
    expect(confirmation.text).not.toContain('SECRET-ORDER-DETAILS');
  });

  it('caps the greeting name at 60 characters', async () => {
    await call(payload({ email: 'c@example.com', name: 'أ'.repeat(100) }));

    const confirmation = mails()[1];
    expect(confirmation.text).toContain('أ'.repeat(60));
    expect(confirmation.text).not.toContain('أ'.repeat(61));
  });

  it('skips the confirmation for disposable addresses but still notifies sales', async () => {
    const res = await call(payload({ email: 'someone@mailinator.com' }));

    expect(res.statusCode).toBe(200);
    expect(res.body.confirmationSent).toBe(false);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('sends at most one confirmation per email address per day', async () => {
    const first = await call(payload({ email: 'repeat@example.com' }), { ip: '198.51.100.20' });
    expect(first.body.confirmationSent).toBe(true);

    const second = await call(payload({ email: 'repeat@example.com' }), { ip: '198.51.100.21' });

    expect(second.statusCode).toBe(200);
    expect(second.body.confirmationSent).toBe(false);
    // Two notifications, only one confirmation.
    expect(sendMail).toHaveBeenCalledTimes(3);
  });
});

/* ── Validation ─────────────────────────────────────────────────────────── */

describe('validation', () => {
  it('rejects an invalid email with 400 and sends nothing', async () => {
    const res = await call(payload({ email: 'not-an-email' }));

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
    expect(res.body.fields.email).toBe('invalid');
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects an unknown sector (translated labels are not keys)', async () => {
    const res = await call(payload({ sector: 'مصانع الغذاء' }));

    expect(res.statusCode).toBe(400);
    expect(res.body.fields.sector).toBe('invalid');
  });

  it('rejects over-long fields', async () => {
    const res = await call(payload({ name: 'a'.repeat(121) }));

    expect(res.statusCode).toBe(400);
    expect(res.body.fields.name).toBe('invalid');
  });

  it('accepts both +20 and leading-0 Egyptian phone formats', async () => {
    for (const phone of ['+201287365399', '01287365399', '+20 128 365 3999', '010-2488-9292']) {
      const res = await call(payload({ phone }), { ip: `198.51.100.${Math.floor(Math.random() * 200) + 1}` });
      expect(res.statusCode, `phone ${phone} should pass`).toBe(200);
    }
  });

  it('rejects non-POST methods', async () => {
    const res = await call(payload(), { method: 'GET' });

    expect(res.statusCode).toBe(405);
    expect(sendMail).not.toHaveBeenCalled();
  });
});

/* ── Header injection ───────────────────────────────────────────────────── */

describe('header injection', () => {
  it('strips CR/LF from the subject built from company and sector', async () => {
    const res = await call(payload({ company: 'Evil\r\nBcc: attacker@evil.com' }));

    expect(res.statusCode).toBe(200);
    const { subject } = mails()[0];
    expect(subject).not.toMatch(/[\r\n]/);
    // The payload survives as inert text, not as a new header.
    expect(subject).toContain('Evil Bcc: attacker@evil.com');
  });

  it('rejects an email address carrying CR/LF', async () => {
    const res = await call(payload({ email: 'a@b.com\r\nBcc: evil@x.com' }));

    expect(res.statusCode).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('trims CR/LF off a phone and never lets it reach the mail', async () => {
    const res = await call(payload({ phone: '01287365399\r\n' }));

    expect(res.statusCode).toBe(200);
    const mail = mails()[0];
    expect(mail.subject).not.toMatch(/[\r\n]/);
    expect(mail.html).not.toMatch(/[\r\n]Bcc/);
    expect(mail.html).toContain('tel:+201287365399'); // the clean, trimmed value
  });

  it('rejects a phone with CR/LF embedded mid-value', async () => {
    const res = await call(payload({ phone: '01287365399\r\nBcc: evil@x.com' }));

    expect(res.statusCode).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});

/* ── Spam gates ─────────────────────────────────────────────────────────── */

describe('spam gates', () => {
  it('fakes success and sends nothing when the honeypot is filled', async () => {
    const res = await call(payload({ website: 'http://spam.example' }));

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('treats an implausibly fast submission as a bot', async () => {
    const res = await call(payload({ renderedAt: Date.now() }));

    expect(res.statusCode).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('treats a missing renderedAt as a bot', async () => {
    const res = await call(payload({ renderedAt: undefined }));

    expect(res.statusCode).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('allows 5 notifications per IP per hour, then 429s', async () => {
    for (let i = 0; i < 5; i += 1) {
      const res = await call(payload(), { ip: '198.51.100.7' });
      expect(res.statusCode).toBe(200);
    }

    const sixth = await call(payload(), { ip: '198.51.100.7' });

    expect(sixth.statusCode).toBe(429);
    expect(sixth.body.error).toBe('rate_limited');
    expect(sendMail).toHaveBeenCalledTimes(5);
  });
});

/* ── Failure handling ───────────────────────────────────────────────────── */

describe('transport failure', () => {
  it('returns 500, leaks nothing, and never attempts the confirmation', async () => {
    sendMail.mockRejectedValueOnce(new Error('SMTP auth failed for sales@forucarton.com'));

    const res = await call(payload({ email: 'customer@example.com' }));

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ ok: false, error: 'send_failed' });
    expect(JSON.stringify(res.body)).not.toMatch(/smtp|SMTP|password|forucarton/);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
});
