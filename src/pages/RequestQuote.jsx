import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_NUMBER = '201024889292';

function buildWhatsAppMessage(lang, data) {
  if (lang === 'ar') {
    return `السلام عليكم،\nاسمي: ${data.name}\nالشركة/المصنع: ${data.company}\nرقم الهاتف: ${data.phone}\nالقطاع: ${data.industry}\nتفاصيل الطلب:\n${data.message}`;
  }
  return `Hello,\nName: ${data.name}\nCompany/Factory: ${data.company}\nPhone: ${data.phone}\nIndustry: ${data.industry}\nOrder Details:\n${data.message}`;
}

export default function RequestQuote() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: '', company: '', phone: '', industry: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send via WhatsApp
    const msg = encodeURIComponent(buildWhatsAppMessage(lang, form));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const industries = [
    { key: 'formInd1' }, { key: 'formInd2' }, { key: 'formInd3' },
    { key: 'formInd4' }, { key: 'formInd5' }, { key: 'formInd6' }, { key: 'formInd7' },
  ];

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
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
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
                  {lang === 'ar' ? 'تم إرسال طلبك!' : 'Request Sent!'}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 28 }}>
                  {lang === 'ar'
                    ? 'شكرًا لتواصلك مع فوريو باك. سنرد عليك في أقرب وقت ممكن.'
                    : 'Thank you for contacting ForYouPack. We\'ll get back to you as soon as possible.'}
                </p>
                <Link to="/" className="btn btn--primary">
                  {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>
              </div>
            ) : (
              <>
                <h2 className="contact__form-title">{t('quoteFormTitle')}</h2>
                <p className="contact__form-sub">{t('quoteFormSub')}</p>

                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-name">
                        {t('formName')} <span className="form-required">*</span>
                      </label>
                      <input
                        id="req-name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder={t('formNamePh')}
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-company">
                        {t('formCompany')} <span className="form-required">*</span>
                      </label>
                      <input
                        id="req-company"
                        name="company"
                        type="text"
                        className="form-input"
                        placeholder={t('formCompanyPh')}
                        value={form.company}
                        onChange={handleChange}
                        required
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-phone">
                        {t('formPhone')} <span className="form-required">*</span>
                      </label>
                      <input
                        id="req-phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        className="form-input"
                        placeholder={t('formPhonePh')}
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="req-industry">
                        {t('formIndustry')} <span className="form-required">*</span>
                      </label>
                      <select
                        id="req-industry"
                        name="industry"
                        className="form-select"
                        value={form.industry}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>{t('formIndustryDefault')}</option>
                        {industries.map((ind) => (
                          <option key={ind.key} value={t(ind.key)}>{t(ind.key)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="req-message">
                      {t('formMessage')} <span className="form-required">*</span>
                    </label>
                    <textarea
                      id="req-message"
                      name="message"
                      className="form-textarea"
                      placeholder={t('formMessagePh')}
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn--primary form-submit" id="quoteSubmitBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      <span>{t('formSubmit')}</span>
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
            <a href="tel:+201024889292" className="quote-cta-card" id="quotePhone1">
              <div className="quote-cta-card__icon quote-cta-card__icon--blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="quote-cta-card__label">{t('contactPhone1Label')}</p>
                <p className="quote-cta-card__value" dir="ltr">01024889292</p>
              </div>
            </a>
            <a href="https://wa.me/201024889292" target="_blank" rel="noopener noreferrer" className="quote-cta-card" id="quoteWaDirect">
              <div className="quote-cta-card__icon quote-cta-card__icon--green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="quote-cta-card__label">{t('contactWaLabel')}</p>
                <p className="quote-cta-card__value" dir="ltr">01024889292</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
