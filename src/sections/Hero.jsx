import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/* ── Animated number counter ────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const started = useRef(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        if (shouldReduce) { el.textContent = target + suffix; return; }
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, shouldReduce]);

  return <span ref={ref}>{target}{suffix}</span>;
}

/* ── Fade-up animation helpers ──────────────────────────── */
const fade = (delay = 0, reduce) => ({
  initial: { opacity: 0, y: reduce ? 0 : 28 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: reduce ? 0 : 0.65,
    delay: reduce ? 0 : delay,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
});

const cardFade = (i, reduce) => ({
  initial: { opacity: 0, y: reduce ? 0 : 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: reduce ? 0 : 0.55,
    delay: reduce ? 0 : 0.75 + i * 0.10,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
});

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const { t, isRTL, lang } = useLanguage();
  const reduce = useReducedMotion();

  const stats = [
    { value: 9,    suffix: '+', labelKey: 'statYears' },
    { value: 6,    suffix: '+', labelKey: 'statIndustries' },
    { value: null, display: '100%', labelKey: 'statQuality' },
    { value: null, display: lang === 'ar' ? '2017' : '2017', labelKey: 'statFounded' },
  ];

  return (
    <section
      className="hero"
      id="home"
      aria-label={isRTL ? 'القسم الرئيسي' : 'Main section'}
    >
      {/* Background elements */}
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="hero__content">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__left">

              {/* 1 — Badge pill */}
              <motion.div className="hero__badge" {...fade(0.15, reduce)}>
                <span className="hero__badge-dot" aria-hidden="true" />
                <span>{t('heroBadge')}</span>
              </motion.div>

              {/* 2 — Main heading (2 lines) */}
              <motion.h1 className="hero__headline" {...fade(0.28, reduce)}>
                <span>{t('heroHeadline1')}</span>
                <br />
                <mark>{t('heroHeadline2')}</mark>
              </motion.h1>

              {/* 3 — Subtext */}
              <motion.p className="hero__desc" {...fade(0.44, reduce)}>
                {t('heroDesc')}
              </motion.p>

              {/* 4 — CTA buttons */}
              <motion.div className="hero__cta-group" {...fade(0.57, reduce)}>
                {/* Primary: gradient */}
                <Link
                  to="/request-quote"
                  className="btn btn--gradient btn--lg"
                  id="heroCta1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>{t('heroCta1')}</span>
                </Link>

                {/* Secondary: outlined */}
                <a
                  href="#products"
                  className="btn btn--outline-accent btn--lg"
                  id="heroCta2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                  <span>{t('heroCta2')}</span>
                </a>
              </motion.div>

              {/* 5 — Divider + Stat cards */}
              <motion.div
                className="hero__stats-section"
                {...fade(0.68, reduce)}
              >
                <div
                  className="hero__stat-cards"
                  role="list"
                  aria-label={isRTL ? 'إحصائيات الشركة' : 'Company stats'}
                >
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.labelKey}
                      className="hero__stat-card"
                      role="listitem"
                      {...cardFade(i, reduce)}
                    >
                      <span className="hero__stat-number" aria-hidden="true">
                        {s.display ? s.display : <Counter target={s.value} suffix={s.suffix} />}
                      </span>
                      <span className="hero__stat-label">{t(s.labelKey)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
