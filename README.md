# Dani Cross Strength — Website

High-energy, black-and-gold 3D landing page for a Sydney strength coach specialising in women over 35.

## Run it

```bash
npm start
```

Then open http://localhost:3000

## Sections

- **Hero** — bold typography, 3D loaded-barbell stage, gold particle field
- **Philosophy** — four pillars
- **Programs** — Foundation / Strength / Elite tiers
- **Transformations** — client before/after stories
- **FAQ** — accordion
- **Book** — Calendly embed + custom interactive calendar

## Before launch

1. **Photos** — replace the `.ba-img` placeholder frames with real, consented client imagery (CSS/SVG placeholders are shown now).
2. **Calendly** — set your real booking URL in `index.html` (`data-url` on `.calendly-inline-widget` and the `iframe src`).
3. **Copy** — update the coach name, pricing, stats, email and social links.
4. **Domain/host** — static site; host on Vercel, Netlify or Cloudflare Pages.

## Tech

- Plain HTML/CSS/JS (no build step)
- CSS 3D transforms, canvas particle field, IntersectionObserver scroll reveal
- Google Fonts (Anton, Oswald, Inter)

## License

MIT