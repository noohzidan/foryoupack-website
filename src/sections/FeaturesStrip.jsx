import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const features = [
  {
    id: 'dims',
    titleKey: 'feat1Title',
    descKey: 'feat1Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18z" />
        <path d="M5 8V6m4 2V5m4 3V6m4 2V5" />
      </svg>
    ),
  },
  {
    id: 'flutes',
    titleKey: 'feat2Title',
    descKey: 'feat2Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 'supply',
    titleKey: 'feat3Title',
    descKey: 'feat3Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'b2b',
    titleKey: 'feat4Title',
    descKey: 'feat4Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
];

const itemVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.5, delay: reduce ? 0 : i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
});

export default function FeaturesStrip() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const v = itemVariants(reduce);

  return (
    <section className="features-strip" aria-label={t('feat1Title')}>
      <div className="container">
        <div className="features-strip__grid">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              className="feature-item"
              custom={i}
              variants={v}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              <div className="feature-item__icon">{f.icon}</div>
              <div className="feature-item__text">
                <p className="feature-item__title">{t(f.titleKey)}</p>
                <p className="feature-item__desc">{t(f.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
