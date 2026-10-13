# For You Carton — شركة فوريو للكرتون

Bilingual (Arabic / English) corporate website for **For You Carton** (شركة فوريو للكرتون), an Egyptian manufacturer of corrugated cardboard cartons for industrial packaging. Based in Sadat City, Menofia, Egypt.

## Stack

- **React 18** + **Vite 5**
- **react-router-dom 7** — client-side routing
- **framer-motion** — section animations
- Plain CSS with CSS custom properties (`src/styles/`)

## Features

- Full RTL / LTR switching (`LanguageContext`) — Arabic is the default locale
- Dark / light theme toggle, persisted to `localStorage` (`ThemeContext`)
- Pages: Home, Contact, Request a Quote
- Quote form with WhatsApp hand-off
- Floating WhatsApp button, back-to-top, scroll progress bar
- SEO metadata, Open Graph and Twitter Card tags in `index.html`

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```

## Project structure

```
src/
├── components/
│   ├── layout/      Header, Footer
│   └── ui/          AnimatedSection, BackToTop, ScrollProgress, WhatsAppFloat
├── context/         LanguageContext (AR/EN), ThemeContext (dark/light)
├── i18n/            translations.js — single source of truth for all copy
├── pages/           Home, Contact, RequestQuote
├── sections/        Hero, FeaturesStrip, About, Products, Specifications, Clients
├── styles/          main.css, sections.css
public/images/       logo, product photos, factory, client logos
```

### Editing copy

All user-facing text lives in `src/i18n/translations.js` under the `en` and `ar`
keys. Add a key to both blocks and read it with the `t('keyName')` helper — do
not hardcode strings in components.

## Deployment

Deployed on **Vercel**. `vercel.json` rewrites all routes to `/index.html` so the
SPA router handles deep links. Pushing to `main` triggers a production deploy.

## Contact

- **Email:** sales@foryoucarton.com
- **Phone / WhatsApp:** +20 128 736 5399 · +20 102 488 9292 · +20 102 499 3313
- **Address:** Plot 2/6276, 6th Industrial Zone, Sadat City, Menofia, Egypt
- **Web:** www.foryoucarton.com
