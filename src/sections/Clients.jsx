import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/* ------------------------------------------------------------------ */
/* Client logo config                                                   */
/*                                                                      */
/*  TO ADD MORE LOGOS:                                                  */
/*    1. Drop the new image into /public/images/clients/                */
/*    2. Name it  client-<next number>.jpg  (or .jpeg / .png / .webp)  */
/*    3. Add an entry to the CLIENT_FILES array below                   */
/* ------------------------------------------------------------------ */
const CLIENT_FILES = [
  'client-1.jpg',
  'client-2.jpg',
  'client-3.jpg',
  'client-4.jpg',
  'client-5.jpg',
  'client-6.jpg',
  'client-7.jpg',
  'client-8.jpg',
  'client-9.jpg',
  'client-10.jpg',
  'client-11.jpg',
  'client-12.jpg',
  'client-13.jpg',
  'client-14.jpg',
  'client-15.jpg',
  'client-16.jpg',
];

const CLIENT_IMAGES = CLIENT_FILES.map((file, i) => ({
  id: i + 1,
  src: `/images/clients/${file}`,
  alt: `Partner ${i + 1}`,
}));

/* ------------------------------------------------------------------ */
/* Static grid fallback for prefers-reduced-motion                     */
/* ------------------------------------------------------------------ */
function StaticLogoGrid({ logos, t }) {
  return (
    <div className="clients__static-grid" role="list" aria-label={t('clientsAriaLabel')}>
      {logos.map((logo, i) => (
        <div key={logo.id} className="clients__logo-card" role="listitem">
          <img
            src={logo.src}
            alt={logo.alt}
            className="clients__logo-img"
            loading={i < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee strip                                                        */
/* ------------------------------------------------------------------ */
function MarqueeStrip({ logos, isRTL }) {
  const trackRef = useRef(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };
  const handleFocusIn  = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
  };
  const handleFocusOut = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
  };

  /* Duplicate list for seamless loop */
  const doubled = [...logos, ...logos];

  return (
    <div
      className="clients__marquee-outer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
      aria-hidden="true"
    >
      {/* Fade edge — left */}
      <div className="clients__fade clients__fade--left" />
      {/* Fade edge — right */}
      <div className="clients__fade clients__fade--right" />

      <div
        ref={trackRef}
        className={`clients__marquee-track ${isRTL ? 'clients__marquee-track--rtl' : ''}`}
        role="presentation"
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="clients__logo-card"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="clients__logo-img"
              loading={i < 6 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading animation variants                                  */
/* ------------------------------------------------------------------ */
const headingVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const subVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ------------------------------------------------------------------ */
/* Main export                                                          */
/* ------------------------------------------------------------------ */
export default function Clients() {
  const { t, isRTL } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section className="clients" id="clients" aria-labelledby="clients-heading">

      {/* ── Section header ── */}
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.div
            className="section-eyebrow"
            variants={reduce ? {} : headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {t('clientsEyebrow')}
          </motion.div>

          <motion.h2
            id="clients-heading"
            className="section-title"
            variants={reduce ? {} : headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {t('clientsTitle')}
          </motion.h2>

          <motion.p
            className="section-subtitle"
            variants={reduce ? {} : subVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {t('clientsSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* ── Logo strip ── */}
      {reduce ? (
        <div className="container">
          <StaticLogoGrid logos={CLIENT_IMAGES} t={t} />
        </div>
      ) : (
        <MarqueeStrip logos={CLIENT_IMAGES} isRTL={isRTL} />
      )}

    </section>
  );
}
