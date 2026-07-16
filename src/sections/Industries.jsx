import { motion, useReducedMotion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, cardVariants } from '../components/ui/AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const industries = [
  {
    id: 'food',
    titleKey: 'ind1Title', descKey: 'ind1Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    ),
  },
  {
    id: 'water',
    titleKey: 'ind2Title', descKey: 'ind2Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    ),
  },
  {
    id: 'agri',
    titleKey: 'ind3Title', descKey: 'ind3Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 7 17 2 17 2s2 5-1 8c3 0 6-2 6-2s-2 5-6 5M12 12C12 7 7 2 7 2S5 7 8 10C5 10 2 8 2 8s2 5 6 5"/>
      </svg>
    ),
  },
  {
    id: 'glass',
    titleKey: 'ind4Title', descKey: 'ind4Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l4 10H4L8 2z"/>
        <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>
        <line x1="12" y1="12" x2="12" y2="20"/>
      </svg>
    ),
  },
  {
    id: 'oil',
    titleKey: 'ind5Title', descKey: 'ind5Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    id: 'cookware',
    titleKey: 'ind6Title', descKey: 'ind6Desc',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l19-9-9 19-2-8-8-2z"/>
      </svg>
    ),
  },
  {
    id: 'export',
    titleKey: 'ind7Title', descKey: 'ind7Desc',
    badgeKey: 'indComingSoonBadge',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

export default function Industries() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const cv = cardVariants(reduce);

  return (
    <section className="industries section" id="industries" aria-labelledby="industries-title">
      <div className="container">
        <AnimatedSection className="section-header">
          <span className="section-eyebrow">{t('industriesEyebrow')}</span>
          <h2 className="text-h2 section-title" id="industries-title">{t('industriesTitle')}</h2>
          <p className="section-subtitle">{t('industriesSubtitle')}</p>
        </AnimatedSection>

        <StaggerContainer className="industries__grid">
          {industries.map((ind) => (
            <motion.div
              key={ind.id}
              className={`industry-card${ind.badgeKey ? ' industry-card--coming-soon' : ''}`}
              variants={cv}
            >
              <div className="industry-card__icon-wrap">{ind.icon}</div>
              {ind.badgeKey && (
                <span className="industry-card__badge">{t(ind.badgeKey)}</span>
              )}
              <h3 className="industry-card__title">{t(ind.titleKey)}</h3>
              <p className="industry-card__desc">{t(ind.descKey)}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
