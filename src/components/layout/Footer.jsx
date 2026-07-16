import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function FooterAccordion({ titleKey, children }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="footer__nav-col">
      <button
        className="footer__nav-title-btn"
        onClick={() => isMobile && setOpen(o => !o)}
        aria-expanded={isMobile ? open : true}
        style={{ cursor: isMobile ? 'pointer' : 'default' }}
      >
        <span className="footer__nav-title">{t(titleKey)}</span>
        <span className={`footer__nav-chevron${open ? ' open' : ''}`}>
          <ChevronIcon />
        </span>
      </button>
      <ul className={`footer__nav-list${isMobile ? (open ? ' expanded' : ' collapsed') : ''}`} role="list">
        {children}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">

          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="ForYouPack">
              <div className="footer__logo-mark" aria-hidden="true" />
              <span className="footer__logo-name">ForYouPack</span>
            </Link>
            <p className="footer__desc">{t('footerDesc')}</p>
            <div className="footer__contact-mini">
              <a href="mailto:info@foryoupack.com" className="footer__contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@foryoupack.com
              </a>
              <a href="tel:+201024889292" className="footer__contact-item" dir="ltr">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                01024889292
              </a>
              <a href="tel:+201024993313" className="footer__contact-item" dir="ltr">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                01024993313
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <FooterAccordion titleKey="footerNavTitle">
            <li><Link to="/" className="footer__nav-link">{t('navHome')}</Link></li>
            <li><a href="/#about" className="footer__nav-link">{t('navAbout')}</a></li>
            <li><a href="/#products" className="footer__nav-link">{t('navProducts')}</a></li>
            <li><a href="/#industries" className="footer__nav-link">{t('navIndustries')}</a></li>
            <li><a href="/#specifications" className="footer__nav-link">{t('navSpecs')}</a></li>
            <li><Link to="/request-quote" className="footer__nav-link">{t('navGetQuote')}</Link></li>
            <li><Link to="/contact" className="footer__nav-link">{t('navContact')}</Link></li>
          </FooterAccordion>

          {/* Contact */}
          <FooterAccordion titleKey="footerContactTitle">
            <li>
              <a href="https://wa.me/201024889292" className="footer__nav-link"
                target="_blank" rel="noopener noreferrer" dir="ltr">
                <span>{t('footerWaPrefix')}</span> 01024889292
              </a>
            </li>
            <li>
              <a href="https://wa.me/201024993313" className="footer__nav-link"
                target="_blank" rel="noopener noreferrer" dir="ltr">
                <span>{t('footerWaPrefix')}</span> 01024993313
              </a>
            </li>
            <li><a href="mailto:info@foryoupack.com" className="footer__nav-link" dir="ltr">info@foryoupack.com</a></li>
            <li><a href="mailto:sales@foryoupack.com" className="footer__nav-link" dir="ltr">sales@foryoupack.com</a></li>
          </FooterAccordion>

          {/* Location */}
          <FooterAccordion titleKey="footerLocationTitle">
            <li style={{ paddingBlock: '4px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                {isRTL ? (
                  <>قطعة 2/6276<br />المنطقة الصناعية السادسة<br />مدينة السادات، المنوفية<br />مصر</>
                ) : (
                  <>Plot 2/6276<br />6th Industrial Zone<br />Sadat City, Menofia<br />Egypt</>
                )}
              </p>
            </li>
            <li style={{ marginTop: '12px' }}>
              <a href="https://www.foryoupack.com"
                style={{ fontSize: '0.83rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                www.foryoupack.com
              </a>
            </li>
          </FooterAccordion>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">{t('footerCopyright')}</p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">{t('footerPrivacy')}</a>
            <a href="#" className="footer__legal-link">{t('footerTerms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
