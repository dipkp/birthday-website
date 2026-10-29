# Session facts — written down because the screenshot buffer rotates

## Origin identity / numbers
- Brand: 2luv · 2 PROJECTS LTDA · Imperatriz-MA, Brazil
- CNPJ 64.092.616/0001-12 · contact@2-luv.com · +1 432-280-3615
- Rating shown: 4.8 / 5 from 1,076 ratings ("More than 290 thousand people have made letters")
- Prices observed (INR): Birthday Party ₹299.00 · Birthday Letter ₹199.00 · Letter + eCards ₹299.00
- Footer legal: reproduction prohibited under Law 9.610/98

## Animation inventory observed on the birthday page (for the "animations missing" fix)

- **Confetti layer**: `.lv3-confetti i` elements, CSS keyframes `lv3-confetti` — rectangles and
  circles in candy colours, drifting down with per-piece `--x --r --c --d --delay`.
- **Reveal-on-scroll**: `.lv3.js-reveal [data-lv3-reveal]` starts `opacity:0; translateY(26px)`
  and gets `.is-in` → 0.9s transition with `--reveal-delay`. Requires the class `js-reveal` on
  the `.lv3` root, set by the bundled reveal module.
- **3D cake**: `lv3-hero-settle` on load, plus a rotating cake (video/canvas) and a
  `data-lv3-cake-video` element.
- **Candle flames**: `flicker` keyframes while `[data-lit="true"]`; `data-wind="on"` skews them.
- **Season pill**: `lv3-season-air` particles + arrow `translate(3px)` on hover.
- **Footer/header**: `lv2-menu-drop` on the drawer, header `is-scrolled` transition.
- Global escape hatch: `@media (prefers-reduced-motion: reduce)` collapses every animation to
  0.01ms — if a browser/OS reports reduce, the page looks static by design.

Facts already consolidated (do not lose): CNPJ **64.092.616/0001-12** · **+1 432-280-3615** ·
**contact@2-luv.com** · **@2luvletters** · ₹**299** / ₹**199** / ₹**299** · **4.8 / 1,076** ·
**© 2025-2026 2luv** · **Law 9.610/98**.

## Codes, amounts, dates — the hard facts (survives image rotation)

| Item | Value |
|---|---|
| Company | 2 PROJECTS LTDA |
| Location | Imperatriz – MA · Brazil |
| CNPJ | 64.092.616/0001-12 |
| Phone | +1 432-280-3615 |
| Support email | contact@2-luv.com |
| Socials | instagram.com/2luvletters · tiktok.com/@2luvletters |
| Copyright line | © 2025-2026 2luv. All rights reserved. |
| Legal basis cited | Law 9.610/98 (reproduction prohibited) |
| Rating | 4.8 out of 5 · 1,076 ratings |
| Social proof | "More than 290 thousand people have made letters" |
| Price — The Full Party / Birthday Party | ₹ 299.00 · one-time payment |
| Price — The Classic / Birthday Letter | ₹ 199.00 · one-time payment |
| Price — The Interactive One / Letter + eCards | ₹ 299.00 · one-time payment |
| Halloween pill | "HALLOWEEN · OCTOBER 21" · chip "14 days to go" · "The Halloween Hotel is open" |
| Christmas | "Opens November 27" · "December 25 · 69 days to go" |
| Valentine | "February 14 · 120 days to go" |
| Blog post dates seen | September 18, 2026 · September 11, 2026 · August 26, 2026 |
| Countdown sample | calendar shows "12" · "12 days to go" |
| Hero 3D caption | "Happy birthday, Bia!" / "Alex threw a little party just for you." |
| Home letter card | "For Bia" · "Bia, I wrote this letter slowly, the way you set a table for someone special." / "With love, Alex" |
| Create-page preview | "A LETTER FOR" / "you" · "with love, Someone special" · "Open the letter" |
| Halloween preview | "Behind these doors, a night just for us." · "Knock on the door" · luggage tag "2L" |
| Screenshot geometry | 1440×900 desktop, 1280×800 audit, 560×752 mobile-ish; home hero stage ≈2,500px tall |

## Route coverage (from sitemap.xml, 2026-10)
- 1,767 URLs total, 256 English (`/en/**`)
- English breakdown: blog 225 · event 14 · create 7 · root/about/contact/cookies/
  copyright/dmca/my-gifts/pricing/privacy/terms 1 each
- Mirrored before this pass: 7 pages (/, /home, /pricing, /create, /blog, /contact, /about)

## Visual states verified in headless Chromium
- **create page**: full wizard — top bar (‹HOME, ABOUT, progress), serif headline,
  LOVED ONE'S NAME / WHO SIGNS THE LETTER fields, Classic theme chip + Change,
  live phone preview with floral table, "A LETTER FOR you", wax-seal envelope,
  "Open the letter" button, cookie banner.
- **home**: nav (What's inside · Gifts · Occasions · Price · FAQ), HALLOWEEN · OCTOBER 21
  pill ("14 days to go", "The Halloween Hotel is open"), eyebrow, headline
  "The digital love letter *that opens like a gift.*", lede, Create my letter + See the gifts,
  4.8 stars, three checkmarks; right side "For Bia" envelope card, vinyl, photos, rose.
- **birthday**: hero headline, foil "3"/"0" balloons, 3D cake with candles, confetti,
  pricing cards with ₹ prices, FAQ accordion (+ rotates 45° to ×).
- **home hero in dark theme** = dark walnut table by candlelight; light theme = bright linen.

## Root causes found (fixed)
1. Subpages linked `../styles.css` → resolved to the *root* (birthday) stylesheet.
   Symptom: arrow SVG painted 1240×1240 as a black triangle; home h1 at y=2504.
2. `/_lazy/privacy-controls-*.js` root-absolute → 404 on every page.
3. `__vite__mapDeps` hints → `//assets/...` (host "assets"); emptying array → `/undefined`.
4. Bare `chunks/x.js` specifiers in `_lazy/` rejected by the browser.
5. Hand-written Cormorant woff2 URL 404 → replaced with Google Fonts @import.
6. `https://media.2-luv.com/...` half-rewritten to `https:../assets/...` (scheme not in pattern).

## Result before this pass
- 7 of 8 pages loaded with an empty console; create page only CORS to api.2-luv.com.
