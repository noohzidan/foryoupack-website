import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__grid">

          {/* Text */}
          <AnimatedSection className="about__content">
            <div className="about__founded-badge">
              <svg className="about__founded-badge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{t('aboutBadge')}</span>
            </div>

            <h2 className="text-h2 about__title" id="about-title">{t('aboutTitle')}</h2>
            <p className="about__lead">{t('aboutLead')}</p>
            <p className="about__body">{t('aboutBody')}</p>

            <div className="about__highlights">
              {[
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                  titleKey: 'aboutH1Title', descKey: 'aboutH1Desc',
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
                  titleKey: 'aboutH2Title', descKey: 'aboutH2Desc',
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                  titleKey: 'aboutH3Title', descKey: 'aboutH3Desc',
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
                  titleKey: 'aboutH4Title', descKey: 'aboutH4Desc',
                },
              ].map((h) => (
                <div key={h.titleKey} className="about__highlight-item">
                  <div className="about__highlight-icon">{h.icon}</div>
                  <div className="about__highlight-text">
                    <strong>{t(h.titleKey)}</strong>
                    <span>{t(h.descKey)}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/contact" className="btn btn--primary" id="aboutCta">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{t('aboutCta')}</span>
            </Link>
          </AnimatedSection>

          {/* Visual */}
          <AnimatedSection delay={0.2} className="about__visual">
            <div className="about__img-main" role="img" aria-label={t('aboutImgLabel')}>
              <div className="about__img-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="14" rx="2"/>
                  <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  <line x1="12" y1="11" x2="12" y2="17"/>
                  <line x1="9" y1="14" x2="15" y2="14"/>
                </svg>
              </div>
              <span className="about__img-label">{t('aboutImgLabel')}</span>
            </div>

            <div className="about__stat-card about__stat-card--1">
              <div className="about__stat-card-icon about__stat-card-icon--blue">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <div className="about__stat-card-num">{t('aboutStat1Num')}</div>
                <div className="about__stat-card-lbl">{t('aboutStat1Lbl')}</div>
              </div>
            </div>

            <div className="about__stat-card about__stat-card--2">
              <div className="about__stat-card-icon about__stat-card-icon--gold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <div className="about__stat-card-num">{t('aboutStat2Num')}</div>
                <div className="about__stat-card-lbl">{t('aboutStat2Lbl')}</div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
