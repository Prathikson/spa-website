# Velour Studio — Next.js v2

Clean, Osmo-inspired luxury beauty studio website for **Velour Studio, Edmonton AB**.

## Design
- **Background**: `#f1f1f1` (bg) / `#ffffff` (surface)
- **Text**: `#1b1b1b` (ink) / `#6b6b6b` (muted)
- **Accents**: Pink `#e879a0` · Purple `#7c3aed` · Green `#16a34a` · Blue `#0284c7`
- **Font**: DM Sans (EN) · Black Han Sans + Noto Sans KR (KO)
- **Nav**: Pill-style centered floating nav with mega menu (Osmo-style)

## Tech Stack
| Tool | Purpose |
|---|---|
| Next.js 14 | Framework |
| Tailwind CSS | Styling |
| GSAP + ScrollTrigger | All animations |
| Lenis | Smooth scroll |
| Lucide React | Icons |

## Get Started
```bash
npm install
npm run dev
# → http://localhost:3000
```

## Pages
| Route | Page |
|---|---|
| `/` | Home (Hero, About, Services, Testimonials, CTA, FAQ, Contact) |
| `/about` | About (Story, Values, Team, Testimonials, FAQ) |
| `/services` | All services grid + FAQ |
| `/services/nail-art` | Nail Art detail |
| `/services/facials` | Facials detail |
| `/services/laser` | Laser detail |
| `/services/tattoo` | Tattoo detail |
| `/services/pedicure-manicure` | Pedicure detail |
| `/services/eyebrow-lash` | Eyebrow & Lash detail |
| `/services/waxing` | Waxing detail |
| `/services/salon` | Full Salon detail |
| `/contact` | Contact + booking form + FAQ |

## Service Detail Pages Include
- Hero with service accent colour
- About + tags + duration/price info
- Step-by-step process
- **3 pricing packages** (Essential, Signature, Monthly membership)
- **Recommended products** (3 per service)
- **Service-specific FAQ** + general FAQ
- Related services grid
- Prev/Next navigation

## Key Features
- **Korean/English toggle** — all content bilingual via `lib/content.ts`
- **Black Han Sans** for Korean display, **DM Sans** for English
- **Session-only preloader** — runs once per browser tab session
- **Pink cursor trail** — minimal dot with fading pink trail
- **Floating pill nav** — Osmo-style with mega menu dropdown
- **Dynamic logo** — colour adapts to background (dark/light)
- **Auto-scroll gallery** on hero — not clickable (display only)

## Customisation
### All Content in One File
Edit `lib/content.ts` to update all text, prices, services, packages, and products — both EN and KO simultaneously.

### Colours (`app/globals.css` `:root`)
```css
--bg:       #f1f1f1   /* page background */
--surface:  #ffffff   /* card surfaces */
--ink:      #1b1b1b   /* primary text */
--muted:    #6b6b6b   /* secondary text */
--pink-s:   #e879a0   /* pink accent */
--purple-s: #7c3aed   /* purple accent */
--green-s:  #16a34a   /* green accent */
--blue-s:   #0284c7   /* blue accent */
```
