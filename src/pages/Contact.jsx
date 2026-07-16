import { useEffect } from 'react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const cards = [
    {
      id: 'phone1',
      href: 'tel:+201024889292',
      iconClass: 'contact__info-card-icon--blue',
      labelKey: 'contactPhone1Label',
      value: '01024889292',
      subKey: 'contactPhoneSub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      id: 'phone2',
      href: 'tel:+201024993313',
      iconClass: 'contact__info-card-icon--blue',
      labelKey: 'contactPhone2Label',
      value: '01024993313',
      subKey: 'contactPhoneSub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      id: 'wa',
      href: 'https://wa.me/201024889292',
      target: '_blank',
      iconClass: 'contact__info-card-icon--green',
      labelKey: 'contactWaLabel',
      value: '01024889292',
      subKey: 'contactWaSub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      id: 'mail-gen',
      href: 'mailto:info@foryoupack.com',
      iconClass: 'contact__info-card-icon--mail',
      labelKey: 'contactEmailGenLabel',
      value: 'info@foryoupack.com',
      subKey: 'contactEmailGenSub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      id: 'mail-sales',
      href: 'mailto:sales@foryoupack.com',
      iconClass: 'contact__info-card-icon--mail',
      labelKey: 'contactEmailSalesLabel',
      value: 'sales@foryoupack.com',
      subKey: 'contactEmailSalesSub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      id: 'addr',
      href: 'https://maps.google.com/?q=Sadat+City+6th+Industrial+Zone+Egypt',
      target: '_blank',
      iconClass: 'contact__info-card-icon--map',
      labelKey: 'contactAddrLabel',
      value: null,
      valueAr: 'قطعة 2/6276، المنطقة الصناعية السادسة',
      valueEn: 'Plot 2/6276, 6th Industrial Zone',
      subKey: 'contactAddrSub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <main id="main-content" style={{ paddingTop: 72 }}>
      <section className="contact section" id="contact" aria-labelledby="contact-title">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-eyebrow">{t('contactEyebrow')}</span>
            <h1 className="text-h2 section-title" id="contact-title">{t('contactTitle')}</h1>
            <p className="section-subtitle">{t('contactSubtitle')}</p>
          </AnimatedSection>

          <div className="contact__grid">
            {/* Info cards */}
            <AnimatedSection>
              <div className="contact__info-cards">
                {cards.map((c, i) => (
                  <AnimatedSection key={c.id} delay={i * 0.07} as="a"
                    href={c.href} target={c.target || undefined}
                    rel={c.target ? 'noopener noreferrer' : undefined}
                    className="contact__info-card"
                    style={{ display: 'flex' }}
                  >
                    <div className={`contact__info-card-icon ${c.iconClass}`}>{c.icon}</div>
                    <div className="contact__info-card-content">
                      <p className="contact__info-card-label">{t(c.labelKey)}</p>
                      <p className="contact__info-card-value" dir="ltr">
                        {c.value ?? (document.documentElement.lang === 'ar' ? c.valueAr : c.valueEn)}
                      </p>
                      <p className="contact__info-card-sub">{t(c.subKey)}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* Map placeholder */}
            <AnimatedSection delay={0.2}>
              <div
                className="contact__map"
                role="img"
                aria-label={t('contactMapLabel')}
              >
                <div className="contact__map-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p className="contact__map-label">{t('contactMapLabel')}</p>
                <a
                  className="contact__map-link"
                  href="https://maps.google.com/?q=Sadat+City+6th+Industrial+Zone+Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  <span>{t('contactMapLink')}</span>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
