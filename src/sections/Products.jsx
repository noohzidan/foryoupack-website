import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, cardVariants } from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const products = [
  {
    id: 'single',
    tagKey: 'prod1Tag', titleKey: 'prod1Title', descKey: 'prod1Desc',
    feats: ['prod1F1', 'prod1F2', 'prod1F3'], labelKey: 'prodImgLabel1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    id: 'double',
    tagKey: 'prod2Tag', titleKey: 'prod2Title', descKey: 'prod2Desc',
    feats: ['prod2F1', 'prod2F2', 'prod2F3'], labelKey: 'prodImgLabel2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    id: 'heavy',
    tagKey: 'prod3Tag', titleKey: 'prod3Title', descKey: 'prod3Desc',
    feats: ['prod3F1', 'prod3F2', 'prod3F3'], labelKey: 'prodImgLabel3',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    id: 'diecut',
    tagKey: 'prod4Tag', titleKey: 'prod4Title', descKey: 'prod4Desc',
    feats: ['prod4F1', 'prod4F2', 'prod4F3'], labelKey: 'prodImgLabel4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
        <line x1="20" y1="4" x2="8.12" y2="15.88"/>
        <line x1="14.47" y1="14.48" x2="20" y2="20"/>
        <line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
  },
];

export default function Products() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const cv = cardVariants(reduce);

  return (
    <section className="products section" id="products" aria-labelledby="products-title">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-eyebrow">{t('productsEyebrow')}</span>
          <h2 className="text-h2 section-title" id="products-title">{t('productsTitle')}</h2>
          <p className="section-subtitle">{t('productsSubtitle')}</p>
        </AnimatedSection>

        <StaggerContainer className="products__grid">
          {products.map((p) => (
            <motion.div key={p.id} className="product-card" variants={cv}>
              <div className="product-card__img" role="img" aria-label={t(p.labelKey)}>
                <div className="product-card__img-icon">{p.icon}</div>
                <span className="product-card__img-label">{t(p.labelKey)}</span>
              </div>
              <div className="product-card__body">
                <span className="product-card__tag">{t(p.tagKey)}</span>
                <h3 className="product-card__title">{t(p.titleKey)}</h3>
                <p className="product-card__desc">{t(p.descKey)}</p>
                <ul className="product-card__features">
                  {p.feats.map((fk) => (
                    <li key={fk} className="product-card__feature">{t(fk)}</li>
                  ))}
                </ul>
                <Link to="/request-quote" className="product-card__cta">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>{t('prodCtaLabel')}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.2} className="products__bottom-cta">
          <p>{t('productsPricingNote')}</p>
          <Link to="/request-quote" className="btn btn--primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{t('productsCtaBtn')}</span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
