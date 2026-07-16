import AnimatedSection from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

export default function Specifications() {
  const { t } = useLanguage();

  return (
    <section className="specifications section" id="specifications" aria-labelledby="specs-title">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-eyebrow">{t('specsEyebrow')}</span>
          <h2 className="text-h2 section-title" id="specs-title">{t('specsTitle')}</h2>
          <p className="section-subtitle">{t('specsSubtitle')}</p>
        </AnimatedSection>

        <div className="specs__grid">

          {/* Dimensions card */}
          <AnimatedSection delay={0.1} className="specs__card">
            <div className="specs__card-header">
              <div className="specs__card-header-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18z"/>
                  <path d="M5 8V6m4 2V5m4 3V6m4 2V5"/>
                </svg>
              </div>
              <div className="specs__card-header-text">
                <h3>{t('specsDimTitle')}</h3>
                <p>{t('specsDimSub')}</p>
              </div>
            </div>
            <div className="specs__card-body">
              <div className="specs__dimensions">
                <div className="specs__dimension-row">
                  <span className="specs__dimension-label">{t('specsWidthLabel')}</span>
                  <span dir="ltr">
                    <span className="specs__dimension-value">165</span>
                    <span className="specs__dimension-unit">cm</span>
                  </span>
                </div>
                <div className="specs__dimension-row">
                  <span className="specs__dimension-label">{t('specsLengthLabel')}</span>
                  <span dir="ltr">
                    <span className="specs__dimension-value">210</span>
                    <span className="specs__dimension-unit">cm</span>
                  </span>
                </div>
              </div>
              <div className="specs__note">{t('specsDimNote')}</div>
            </div>
          </AnimatedSection>

          {/* Flutes table card */}
          <AnimatedSection delay={0.2} className="specs__card">
            <div className="specs__card-header">
              <div className="specs__card-header-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <div className="specs__card-header-text">
                <h3>{t('specsFlutesTitle')}</h3>
                <p>{t('spacesFlutesSub')}</p>
              </div>
            </div>
            <div className="specs__card-body">
              <table className="specs__table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'start' }}>{t('specsFluteTh1')}</th>
                    <th>{t('specsFluteTh2')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { badge: 'E', nameKey: 'specsEFluteName', descKey: 'specsEFluteDesc', coeff: '1.20' },
                    { badge: 'B', nameKey: 'specsBFluteName', descKey: 'specsBFluteDesc', coeff: '1.32' },
                    { badge: 'C', nameKey: 'specsCFluteName', descKey: 'specsCFluteDesc', coeff: '1.42' },
                  ].map((row) => (
                    <tr key={row.badge}>
                      <td>
                        <div className="specs__flute-name">
                          <div className="specs__flute-badge">{row.badge}</div>
                          <div className="specs__flute-label">
                            <strong>{t(row.nameKey)}</strong>
                            <span>{t(row.descKey)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="specs__flute-coeff">
                        <span className="specs__coeff-value" dir="ltr">{row.coeff}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="specs__note">{t('specsFlutesNote')}</div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
