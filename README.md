# ForYouPack Website

**Bilingual (Arabic + English) static business website for ForYouPack — Industrial Packaging Manufacturer**

🌐 **Live site:** [www.foryoupack.com](https://www.foryoupack.com)

---

## About

ForYouPack (فوريو باك) is an Egyptian Limited Liability Company specializing in corrugated cardboard carton manufacturing for industrial packaging since 2017, located in Sadat City, Menofia, Egypt.

---

## File Structure

```
forupack/
├── index.html          ← Full bilingual site (all sections)
├── vercel.json         ← Vercel deployment config
├── .gitignore
├── README.md
├── css/
│   ├── style.css       ← Design system, themes (Blue & Dark), header, hero
│   ├── sections.css    ← About, Products, Industries, Specs, Contact, Footer
│   └── animations.css  ← Scroll progress, hover effects, entrance animations
└── js/
    └── main.js         ← Language toggle, theme toggle, scroll, mobile menu,
                           reveal animations, form handler, back-to-top
```

---

## Features

- ✅ **Fully bilingual** — Arabic (RTL, Cairo font) + English (LTR, Inter font)
- ✅ **Two color themes** — Professional Blue + Dark Industrial (toggle in header)
- ✅ **Language toggle** — instant switch, no page reload, persists in localStorage
- ✅ **URL lang param** — `?lang=en` or `?lang=ar` for direct linking
- ✅ **Sections:** Hero, About, Products, Industries, Technical Specs, Contact, Footer
- ✅ **Technical Specs table** — E/B/C flute coefficients (1.30 / 1.40 / 1.45)
- ✅ **Production dimensions** — Width 165cm × Length 210cm
- ✅ **Contact form** → `sales@foryoupack.com` via mailto + live WhatsApp prefill
- ✅ **WhatsApp click-to-chat** — floating button + contact section links
- ✅ **Scroll progress bar**, back-to-top button
- ✅ **Scroll reveal animations** for all sections
- ✅ **Hero counter animations** (9+, 6+)
- ✅ **Full SEO** — meta tags, Open Graph, Twitter Card, JSON-LD structured data
- ✅ **Responsive** — mobile / tablet / desktop
- ✅ **Accessible** — semantic HTML, ARIA labels, keyboard navigable
- ✅ **Print styles**, reduced-motion support

---

## Image Placeholders

Replace the following placeholders with real photos when available:

| Location | Placeholder Label |
|---|---|
| Hero section | `[Image: Factory exterior — ForYouPack production facility]` |
| About Us | `[Image: Factory exterior — ForYouPack production facility, Sadat City]` |
| Product 1 | `[PRODUCT IMAGE: Corrugated Box Type 1 — Single Wall]` |
| Product 2 | `[PRODUCT IMAGE: Corrugated Box Type 2 — Double Wall]` |
| Product 3 | `[PRODUCT IMAGE: Corrugated Box Type 3 — Heavy Duty Industrial]` |
| Product 4 | `[PRODUCT IMAGE: Corrugated Box Type 4 — Die-Cut Custom Shape]` |
| Contact / Map | `[Google Maps — Factory location: 6th Industrial Zone, Sadat City]` |

**To add a real Google Maps embed:** Replace the `.contact__map` div in `index.html` with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!...YOUR_MAP_EMBED_URL..."
  width="100%" height="250" style="border:0; border-radius:16px;"
  allowfullscreen="" loading="lazy"
></iframe>
```

---

## Deploy to Vercel via GitHub

### Step 1 — Initialize Git
```bash
cd forupack
git init
git add .
git commit -m "Initial commit — ForYouPack website"
```

### Step 2 — Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `foryoupack` (or any name)
3. Keep it **Private** (recommended)
4. Do NOT initialize with README

### Step 3 — Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/foryoupack.git
git branch -M main
git push -u origin main
```

### Step 4 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `foryoupack` GitHub repository
4. Framework preset: **Other** (static site)
5. Root directory: `/` (leave as default)
6. Click **Deploy**

### Step 5 — Add Custom Domain
1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `www.foryoupack.com` and `foryoupack.com`
3. Update your domain DNS:
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`
4. Wait 24-48 hours for DNS propagation

---

## Contact Info (Reference)

| | |
|---|---|
| Phone 1 | 01024889292 |
| Phone 2 | 01024993313 |
| WhatsApp | Both numbers above |
| Email (General) | info@foryoupack.com |
| Email (Sales) | sales@foryoupack.com |
| Address | Plot 2/6276, 6th Industrial Zone, Sadat City, Menofia, Egypt |
| Website | www.foryoupack.com |

---

## Customization Notes

- **Colors:** Edit CSS variables in `css/style.css` under `:root` (blue) or `[data-theme="dark"]`
- **Fonts:** Cairo (Arabic) and Inter (English) loaded from Google Fonts
- **Logo:** Currently text-based wordmark — replace with real logo by updating the `.logo__mark` element in `index.html`
- **OG Image:** Add a real `og-image.png` (1200×630px) to the root folder and update the `og:image` meta tag
- **Translations:** All text strings are in `js/main.js` under `translations.ar` and `translations.en`

---

*© 2026 ForYouPack — فوريو باك ذات مسئولية محدودة. All rights reserved.*
