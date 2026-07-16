import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import WhatsAppFloat from './components/ui/WhatsAppFloat';
import Home from './pages/Home';
import Contact from './pages/Contact';
import RequestQuote from './pages/RequestQuote';

import './styles/main.css';
import './styles/sections.css';

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Skip to main content for accessibility */
function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: -60,
        left: 16,
        padding: '8px 16px',
        background: 'var(--color-primary)',
        color: '#fff',
        borderRadius: 8,
        fontWeight: 600,
        zIndex: 9999,
        transition: 'top 0.2s',
      }}
      onFocus={e => { e.currentTarget.style.top = '16px'; }}
      onBlur={e => { e.currentTarget.style.top = '-60px'; }}
    >
      Skip to main content
    </a>
  );
}

function AppContent() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        {/* Catch-all → home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
