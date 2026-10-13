import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, cardVariants } from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const products = [
  {
    id: 'single',
    tagKey: 'prod1Tag', titleKey: 'prod1Title', descKey: 'prod1Desc',
    feats: ['prod1F1', 'prod1F2', 'prod1F3'], labelKey: 'prodImgLabel1',
    image: '/images/product-1.jpg',
  },
  {
    id: 'double',
    tagKey: 'prod2Tag', titleKey: 'prod2Title', descKey: 'prod2Desc',
    feats: ['prod2F1', 'prod2F2', 'prod2F3'], labelKey: 'prodImgLabel2',
    image: '/images/product-2.jpg',
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
              <div className="product-card__img">
                <img
                  src={p.image}
                  alt={t(p.labelKey)}
                  className="product-card__img-photo"
                  loading="lazy"
                  decoding="async"
                />
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
