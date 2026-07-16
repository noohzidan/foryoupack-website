import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

/* ── Chevron Icon ──────────────────────────────────────── */
const ChevronIcon = ({ className = '' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Sun Icon ──────────────────────────────────────────── */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ── Nav dropdown data ─────────────────────────────────── */
const getDropdownItems = (t) => ({
  about: [
    { labelKey: 'navAboutOverview', href: '/#about' },
    { labelKey: 'navAboutLocation', href: '/contact' },
  ],
  products: [
    { labelKey: 'navProductsSingle',  href: '/#products' },
    { labelKey: 'navProductsDouble',  href: '/#products' },
    { labelKey: 'navProductsHeavy',   href: '/#products' },
    { labelKey: 'navProductsDieCut',  href: '/#products' },
  ],
  industries: [
    { labelKey: 'navIndustriesFood',     href: '/#industries' },
    { labelKey: 'navIndustriesWater',    href: '/#industries' },
    { labelKey: 'navIndustriesAgri',     href: '/#industries' },
    { labelKey: 'navIndustriesGlass',    href: '/#industries' },
    { labelKey: 'navIndustriesOil',      href: '/#industries' },
    { labelKey: 'navIndustriesCookware', href: '/#industries' },
  ],
});

/* ── Desktop Dropdown ──────────────────────────────────── */
function NavDropdown({ items, isOpen, onClose }) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="nav__dropdown"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {items.map((item) => (
            <a
              key={item.labelKey}
              href={item.href}
              className="nav__dropdown-item"
              onClick={onClose}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Header Component ──────────────────────────────────── */
export default function Header() {
  const { lang, setLang, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'about' | 'products' | 'industries' | null
  const [mobileExpanded, setMobileExpanded] = useState({}); // { about: bool, products: bool, industries: bool }
  const location = useLocation();
  const headerRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const dropdownItems = getDropdownItems(t);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded({});
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = (key) => {
    clearTimeout(hoverTimerRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMobileExpanded = (key) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { key: 'home',       labelKey: 'navHome',       href: '/',               dropdown: null },
    { key: 'about',      labelKey: 'navAbout',      href: '/#about',         dropdown: 'about' },
    { key: 'products',   labelKey: 'navProducts',   href: '/#products',      dropdown: 'products' },
    { key: 'industries', labelKey: 'navIndustries', href: '/#industries',    dropdown: 'industries' },
    { key: 'specs',      labelKey: 'navSpecs',      href: '/#specifications', dropdown: null },
    { key: 'contact',    labelKey: 'navContact',    href: '/contact',        dropdown: null }, // plain link per spec
  ];

  return (
    <>
      <header ref={headerRef} className={`header${scrolled ? ' scrolled' : ''}`} id="header" role="banner">
        <div className="container">
          <div className="header__inner">

            {/* Logo */}
            <Link to="/" className="logo" aria-label="ForYouPack — Home">
              <div className="logo__mark" aria-hidden="true" />
              <div className="logo__text">
                <span className="logo__name">{t('logoName')}</span>
                <span className="logo__tagline">{t('logoTagline')}</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="nav" role="navigation" aria-label="Main Navigation">
              <ul className="nav__list" role="list">
                {navItems.map((item) => (
                  <li
                    key={item.key}
                    className="nav__item"
                    onMouseEnter={item.dropdown ? () => handleMouseEnter(item.dropdown) : undefined}
                    onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          className={`nav__link${openDropdown === item.dropdown ? ' active' : ''}`}
                          onClick={() => setOpenDropdown(openDropdown === item.dropdown ? null : item.dropdown)}
                          aria-expanded={openDropdown === item.dropdown}
                          aria-haspopup="true"
                        >
                          {t(item.labelKey)}
                          <ChevronIcon className={`nav__chevron${openDropdown === item.dropdown ? ' open' : ''}`} />
                        </button>
                        <NavDropdown
                          items={dropdownItems[item.dropdown]}
                          isOpen={openDropdown === item.dropdown}
                          onClose={() => setOpenDropdown(null)}
                        />
                      </>
                    ) : (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) => `nav__link${isActive && item.href !== '/#about' ? ' active' : ''}`}
                        end={item.href === '/'}
                      >
                        {t(item.labelKey)}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Controls */}
            <div className="header__controls">

              {/* Language Toggle */}
              <div className="lang-toggle" role="group" aria-label="Language selection">
                <button
                  className={`lang-btn${lang === 'ar' ? ' active' : ''}`}
                  onClick={() => setLang('ar')}
                  aria-pressed={lang === 'ar'}
                >عربي</button>
                <button
                  className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                  onClick={() => setLang('en')}
                  aria-pressed={lang === 'en'}
                >EN</button>
              </div>

              {/* Theme Toggle */}
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Quote CTA */}
              <Link to="/request-quote" className="btn btn--primary header__cta">
                {t('navGetQuote')}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className={`mobile-menu-btn${mobileOpen ? ' open' : ''}`}
                id="mobileMenuBtn"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobileNav"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className={`mobile-nav${mobileOpen ? ' open' : ''}`}
        id="mobileNav"
        role="navigation"
        aria-label="Mobile menu"
      >
        <ul className="mobile-nav__list" role="list">
          {navItems.map((item) => (
            <li key={item.key}>
              {item.dropdown ? (
                <>
                  <button
                    className="mobile-nav__link"
                    onClick={() => toggleMobileExpanded(item.key)}
                    aria-expanded={!!mobileExpanded[item.key]}
                  >
                    {t(item.labelKey)}
                    <ChevronIcon className={`mobile-nav__chevron${mobileExpanded[item.key] ? ' open' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded[item.key] && (
                      <motion.div
                        className="mobile-nav__submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        {dropdownItems[item.dropdown].map((sub) => (
                          <a
                            key={sub.labelKey}
                            href={sub.href}
                            className="mobile-nav__submenu-item"
                            onClick={() => setMobileOpen(false)}
                          >
                            {t(sub.labelKey)}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
                  to={item.href}
                  className="mobile-nav__link"
                  onClick={() => setMobileOpen(false)}
                  end={item.href === '/'}
                  style={{ display: 'block' }}
                >
                  {t(item.labelKey)}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="mobile-nav__cta">
          <Link
            to="/request-quote"
            className="btn btn--primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            {t('navGetQuote')}
          </Link>
        </div>
      </div>
    </>
  );
}
