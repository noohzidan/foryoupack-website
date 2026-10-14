import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';
import { SECTORS } from '../shared/sectors';

const WHATSAPP_NUMBER = '201287365399';
const WHATSAPP_DISPLAY = '+201287365399';

/* Mirrors the server-side rules in api/quote.js. The server is the authority;
 * these exist so the visitor gets feedback without a round trip. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+ -]{8,20}$/; // literal space — \s would allow CR/LF

const EMPTY = { name: '', company: '', phone: '', sector: '', message: '', email: '' };

/** Validate locally; returns a map of field → i18n key. */
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'errName';
  if (!values.company.trim()) errors.company = 'errCompany';

  const phone = values.phone.trim();
  if (!phone || !PHONE_RE.test(phone)) errors.phone = 'errPhone';

  if (!values.sector) errors.sector = 'errSector';
  if (!values.message.trim()) errors.message = 'errMessage';

  const email = values.email.trim();
  if (email && !EMAIL_RE.test(email)) errors.email = 'errEmail';

  return errors;
}

const SpinnerIcon = () => (
  <svg className="form-spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function RequestQuote() {
  const { t, lang } = useLanguage();

  const [form, setForm] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorKind, setErrorKind] = useState('generic'); // generic | rate_limited
  const [confirmationSent, setConfirmationSent] = useState(false);

  const renderedAtRef = useRef(Date.now());
  const statusRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Move focus to the result so screen readers announce it. */
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the visitor edits it.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`req-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          phone: form.phone.trim(),
          sector: form.sector,
          message: form.message.trim(),
          email: form.email.trim(),
          lang,
          website: honeypot,              // honeypot — must stay empty
          renderedAt: renderedAtRef.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setConfirmationSent(Boolean(data.confirmationSent));
        setStatus('success');
        setForm(EMPTY);
        setHoneypot('');
        renderedAtRef.current = Date.now();
        return;
      }

      // Server-side field errors (client validation should have caught these).
      if (res.status === 400 && data.fields) {
        const mapped = {};
        for (const key of Object.keys(data.fields)) {
          mapped[key] = `err${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        }
        setErrors(mapped);
      }

      setErrorKind(res.status === 429 ? 'rate_limited' : 'generic');
      setStatus('error');
    } catch {
      /* Network failure, or the site is being served somewhere without the
       * serverless runtime (e.g. the VPS preview). Input is preserved so the
       * visitor can retry or fall back to WhatsApp. */
      setErrorKind('generic');
      setStatus('error');
    }
  };

  const fieldProps = (name) => ({
    id: `req-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `req-${name}-error` : undefined,
    className: `${name === 'message' ? 'form-textarea' : name === 'sector' ? 'form-select' : 'form-input'}${errors[name] ? ' form-control--invalid' : ''}`,
  });

  const errorText = (name) => errors[name] && (
    <p className="form-error" id={`req-${name}-error`} role="alert">{t(errors[name])}</p>
  );

  return (
    <main id="main-content" style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div className="quote-page__hero">
        <div className="container">
          <motion.div
            className="quote-page__hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="quote-page__eyebrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, marginInlineEnd: 4 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>{t('quoteTitle')}</span>
            </div>
            <h1 className="quote-page__title">{t('quoteFormTitle')}</h1>
            <p className="quote-page__subtitle">{t('quoteSubtitle')}</p>
            <Link to="/" className="quote-page__back">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              <span>{t('backToHome')}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Form body */}
      <div className="quote-page__body">
        <div className="container">
          <AnimatedSection className="quote-page__form-wrap">
            {status === 'success' ? (
              <div className="form-status form-status--success" role="status" aria-live="polite" tabIndex={-1} ref={statusRef}>
                <div style={{
                  width: 72, height: 72,
                  background: 'var(--color-primary-subtle)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'var(--color-primary)',
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 12 }}>
                  {t('quoteSuccessTitle')}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: confirmationSent ? 8 : 28 }}>
                  {t('quoteSuccessBody')}
                </p>
                {confirmationSent && (
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 28 }}>
                    {t('quoteSuccessEmailSent')} <span dir="ltr">{form.email}</span>
                    <br />
                    <span style={{ fontSize: '0.9rem', opacity: 0.85 }}>{t('quoteSuccessEmailHint')}</span>
                  </p>
                )}
                <Link to="/" className="btn btn--primary">
                  {t('navHome')}
                </Link>
              </div>
            ) : (
              <>
                <h2 className="contact__form-title">{t('quoteFormTitle')}</h2>
                <p className="contact__form-sub">{t('quoteFormSub')}</p>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot — hidden from humans and assistive tech, never focusable. */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="req-website">Website</label>
                    <input
                      id="req-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-name">
                        {t('formName')} <span className="form-required">*</span>
                      </label>
                      <input
                        {...fieldProps('name')}
                        type="text"
                        placeholder={t('formNamePh')}
                        required
                        maxLength={120}
                        autoComplete="name"
                      />
                      {errorText('name')}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-company">
                        {t('formCompany')} <span className="form-required">*</span>
                      </label>
                      <input
                        {...fieldProps('company')}
                        type="text"
                        placeholder={t('formCompanyPh')}
                        required
                        maxLength={120}
                        autoComplete="organization"
                      />
                      {errorText('company')}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-phone">
                        {t('formPhone')} <span className="form-required">*</span>
                      </label>
                      <input
                        {...fieldProps('phone')}
                        type="tel"
                        dir="ltr"
                        placeholder={t('formPhonePh')}
                        required
                        maxLength={30}
                        autoComplete="tel"
                      />
                      {errorText('phone')}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-sector">
                        {t('formIndustry')} <span className="form-required">*</span>
                      </label>
                      <select {...fieldProps('sector')} required>
                        <option value="" disabled>{t('formIndustryDefault')}</option>
                        {SECTORS.map((s) => (
                          <option key={s.key} value={s.key}>{t(s.i18nKey)}</option>
                        ))}
                      </select>
                      {errorText('sector')}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="req-email">
                      {t('formEmail')}
                    </label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      dir="ltr"
                      placeholder={t('formEmailPh')}
                      maxLength={254}
                      autoComplete="email"
                    />
                    <p className="form-hint">{t('formEmailHint')}</p>
                    {errorText('email')}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="req-message">
                      {t('formMessage')} <span className="form-required">*</span>
                    </label>
                    <textarea
                      {...fieldProps('message')}
                      placeholder={t('formMessagePh')}
                      required
                      maxLength={3000}
                      rows={5}
                    />
                    {errorText('message')}
                  </div>

                  {status === 'error' && (
                    <div className="form-status form-status--error" role="alert" tabIndex={-1} ref={statusRef}>
                      <p style={{ fontWeight: 700, marginBottom: 6 }}>{t('quoteErrorTitle')}</p>
                      <p style={{ marginBottom: 14 }}>
                        {errorKind === 'rate_limited' ? t('quoteErrorRateLimit') : t('quoteErrorBody')}
                      </p>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="form-whatsapp"
                        style={{ display: 'inline-flex' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>{t('quoteChatWhatsapp')} — <span dir="ltr">{WHATSAPP_DISPLAY}</span></span>
                      </a>
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn--primary form-submit"
                      id="quoteSubmitBtn"
                      disabled={status === 'sending'}
                      aria-busy={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <>
                          <SpinnerIcon />
                          <span>{t('formSending')}</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                          <span>{t('formSubmit')}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="form-whatsapp"
                      id="quoteWaBtn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>{t('formWhatsapp')}</span>
                    </a>
                  </div>
                </form>
              </>
            )}
          </AnimatedSection>

          {/* Alternative contact cards below form */}
          <div className="quote-page__cta-cards">
            <a href="tel:+201287365399" className="quote-cta-card" id="quotePhone1">
              <div className="quote-cta-card__icon quote-cta-card__icon--blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="quote-cta-card__label">{t('contactPhone1Label')}</p>
                <p className="quote-cta-card__value" dir="ltr">+201287365399</p>
              </div>
            </a>
            <a href="https://wa.me/201287365399" target="_blank" rel="noopener noreferrer" className="quote-cta-card" id="quoteWaDirect">
              <div className="quote-cta-card__icon quote-cta-card__icon--green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="quote-cta-card__label">{t('contactWaLabel')}</p>
                <p className="quote-cta-card__value" dir="ltr">+201287365399</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
