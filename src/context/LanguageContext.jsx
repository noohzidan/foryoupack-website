import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);

const LANG_KEY = 'fyp-lang';
const DEFAULT_LANG = 'ar';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // Check URL param first
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'ar') return urlLang;
    return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  });

  const setLang = (newLang) => {
    if (newLang === lang) return;

    // Smooth cross-fade: fade out → swap → fade in
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('lang-transitioning');
      root.classList.remove('lang-transition-in');

      setTimeout(() => {
        setLangState(newLang);
        localStorage.setItem(LANG_KEY, newLang);

        // After React re-renders, fade back in
        requestAnimationFrame(() => {
          root.classList.remove('lang-transitioning');
          root.classList.add('lang-transition-in');
          setTimeout(() => root.classList.remove('lang-transition-in'), 200);
        });
      }, 180);
    } else {
      setLangState(newLang);
      localStorage.setItem(LANG_KEY, newLang);
    }
  };

  // Apply dir and lang attributes to <html> element
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-lang', lang);
    // Sync body lang for CSS font selectors
    document.body.setAttribute('lang', lang);

    // Update page title
    const t = translations[lang];
    if (t?.pageTitle) document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t?.metaDesc) metaDesc.setAttribute('content', t.metaDesc);
  }, [lang]);

  const t = (key) => {
    const val = translations[lang]?.[key];
    if (val === undefined) {
      // Fallback to other language
      return translations[lang === 'ar' ? 'en' : 'ar']?.[key] ?? key;
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
