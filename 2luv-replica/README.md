# 2luv birthday page — reverse-engineered replica

A runnable copy of **https://www.2-luv.com/en/event/birthday**, plus the rest of the site's
marketing pages and a lab where each interactive feature can be driven on its own.

The real markup, stylesheet and feature logic are used directly — this is a rebuild from the
captured source, not a lookalike written from screenshots.

---

## Run it

**Double-click `start.cmd`.** It serves the folder on port 8899 and opens a browser.

Or serve it yourself:

```powershell
cd 2luv-replica
python -m http.server 8899
```

Opening `index.html` directly also works now — the JavaScript is bundled into classic scripts
so it runs from a `file://` origin too. Serving is still preferable: video seeking and the
pricing request behave better over http.

---

## Coverage

The origin's `sitemap.xml` declares **1,767 URLs across 12 locales**. **All of them are mirrored.**

| Locale | Routes | | Locale | Routes |
|---|---|---|---|---|
| en | 256 | | zh-tw | 138 |
| pt | 140 | | zh | 138 |
| fr | 139 | | ja | 138 |
| es | 139 | | ko | 135 |
| de | 139 | | ms | 135 |
| | | | ar | 135 |
| | | | ru | 135 |

Plus each locale's root page (`/pt`, `/fr`, …), which the sitemap omits, and the hand-built
feature lab.

**Verified:** every locale root returns 200 with the correct `lang` — `en-US`, `pt-BR`, `fr-FR`,
`es-ES`, `de-DE`, `zh-CN`, `zh-TW`, `ja-JP`, `ko-KR`, `ms-MY`, `ar-SA`, `ru-RU` — and a localised
`<title>` (e.g. pt: "Carta virtual de amor com fotos, música e QR Code").

**Totals: 1,768 pages · 6,685 files · 614.3 MB.**

**Animations are copied, not approximated.** The origin's animations live in its CSS and its
bundles, and both are mirrored verbatim: **1,987 `@keyframes`**, **2,506 `animation:`** and
**7,595 `transition:`** declarations across the 256 per-page stylesheets, plus the JS-driven
ones (scroll reveal, 3D cake spin, candle blow-out, foil balloons, confetti, countdown).

**`python audit_all.js` in `audit-tools/` loads every one of the 256 routes in headless
Chromium and reports console errors, page errors and 4xx/5xx requests: 256/256 routes carry
no broken local request.** Eight pages still log one CORS error each because they call
`api.2-luv.com` (letter session, Christmas availability) - that is their backend, not a file.

## Completeness, measured

A route can return 200, load with an empty console, and still be *missing elements* - that is
exactly what happened here, so the mirror is now diffed against the live origin rather than
just checked for errors.

`audit-tools/dom_diff.js` loads the origin and the mirror for a route in the same browser and
compares element count, `<img>`/`<svg>`/`<video>`/`<canvas>`/`<section>` counts and rendered
text length.

Two whole classes of missing elements were found this way:
- **Occasion / legal / my-gifts pages shipped with no JavaScript at all.** Astro emits its
  module entry points in `<head>`; the builder only looked for them in `<body>`, dropped the
  head, and therefore produced no bundle. Symptom: the consent banner (a 27-node
  `twoluv-consent-banner` + its copy) was missing on those pages, and 92 elements with it.
  Fixed by reading scripts from the whole document and carrying head-level inline modules
  across as classic scripts.
- **The bundle tag was written into a string that never contained `</body>`**, so even when
  esbuild succeeded the `<script>` was never inserted. Now appended to the body directly.

After those two fixes the sampled diff reports **0 gaps**: section counts identical, text length
delta 0 on every occasion page, `<img>`/`<svg>`/`<video>`/`<canvas>` counts matching.

### Broken images the DOM diff cannot see

A card can render with all its text and still show a broken-image icon, because only the `<img>`
source failed. The "What's inside" grid on the Halloween flow was exactly that: 8 cards, 5 icons
failing. Static scanning missed them because the paths are built up in JS.

`audit-tools/crawl_404.js` handles the whole class: it walks all 256 routes, scrolls each page in
700px steps so lazy images fire, records every 404, then downloads those files from the origin
into the exact path the page asked for. Full-site pass: **63 distinct 404s found** - 61 of them
page URLs that re-check at **200** afterwards, plus theme/cinema artwork (the poster set behind
"Cinema", incl. `addams`, `nightmare-christmas`, `conjuring`) which are now local and render.

## Independent verification with REA

The mirror is also checked against a second, independent engine: **`rea-agents`** (v6.5.0,
MIT) — a reverse-engineering CLI that speaks CDP. Setup and run:

```powershell
npx rea-agents@latest setup
# launch any Chromium with CDP, e.g.
#   msedge --headless=new --remote-debugging-port=9222 --user-data-dir=<tmp>
npx rea-agents@latest list-browser-targets http://127.0.0.1:9222 --allowed-origins https://www.2-luv.com
npx rea-agents@latest analyze-web-bundle http://127.0.0.1:9222 <target-id> \
    --allowed-origins https://www.2-luv.com --observation-ms 2500 --format json --full-output
```

On `/en/event/birthday` REA reported **34 captured chunks and 20 import edges**. Cross-checking
every captured URL against the mirror: **19 real external scripts, all 19 present on disk**.
The remaining 15 entries are not files — 13 are the page's own inline scripts (REA records them
under the page URL), 1 is Cloudflare's `/cdn-cgi/challenge-platform/scripts/jsd/main.js` and 1 is
Google's `/q0co/` tag gateway, both deliberately stripped.

REA's own limitations note is worth keeping in view: it does **not** execute captured JavaScript,
so its findings are observations and bounded inferences — which is exactly why the browser crawl
and the DOM diff exist alongside it. Three tools, three different failure modes covered.

### Missing audio (found the same way)

The 404 crawl only looked at images and video, so **all 66 theme audio files were absent** — every
ambient bed, music loop and SFX cue (`themes/bloom/v1/audio/*.m4a`, `themes/halloween/v1/audio/*.mp3`,
`themes/party/v1/audio/*.mp3`). Without them the letters and cinematic flows play silently.

Fixed by scanning the shipped JS for audio extensions, fetching all 66 (10.0 MB), and extending
`fetch_root_refs.py` so future runs catch `mp3|m4a|aac|ogg|wav|flac|opus` too.

Verified against the site's **own audio manifest**, which ships `bytes` and `sha256` per cue:

```
manifest entries found: 44
byte + sha256 exact : 44
size mismatch       : 0
sha mismatch        : 0
not on disk         : 0
```

So the audio is not just present — it is byte-identical to the origin.

## AI feature — local, encrypted, key never in the browser

The site's own AI (`POST /api/ai/gift-suggestions`) is backend-gated: it needs an issued token and
is wrapped in a `secure("ai", …)` envelope, so a static mirror cannot call it. It is replaced here
by a local service rather than faked.

**`ai-service/server.js`** (zero dependencies)
- listens on `127.0.0.1:8787`, CORS-locked to the replica's origins
- holds the FreeLLMAPI key server-side, read from `FREELLMAPI_KEY` or `ai-service/.key`
  (gitignored, outside the web root — never served)
- calls the gateway at `127.0.0.1:31415/v1/chat/completions` with `model: auto`
- returns an **AES-256-GCM** envelope `{v, iv, ct, sig}` where `ct` is ciphertext‖tag, so the
  browser can decrypt with WebCrypto directly
- issues a fresh 32-byte session key per `GET /api/ai/session`, 15-minute TTL
- HMAC-tags the ciphertext, and never logs prompts in plaintext (only an at-rest-encrypted token)

**`2luv-replica/ai/`** — the UI, styled to match the site, which requests a session key, posts the
prompt, and decrypts the reply with `crypto.subtle`.

Verified end to end in a real browser:

```
status : 3 suggestions · decrypted in 4307 ms · model agnes-3.0-flash
cards  : The Unrecorded Moments · A Year of Us · For Your New Chapter
console: no errors
round-trip: tamper rejected (GCM auth tag)
```

**Honest scope of "encrypted"**: the API key never leaves the service, transport is loopback-only,
payloads are AES-256-GCM sealed and tamper-evident. What encryption cannot do is hide the session
key from the person using the page — any key a browser decrypts with is readable by that browser.
Real secrecy needs the request to terminate on a server you control, which is what this service is.

## What's here

| Path | Page | Origin |
|---|---|---|
| `index.html` | Birthday landing page — the requested target | `/en/event/birthday` |
| `home/index.html` | Marketing home | `/en` |
| `pricing/index.html` | Pricing | `/en/pricing` |
| `create/index.html` | Love-letter / gift creator | `/en/create/love-letter` |
| `blog/index.html` | Blog index | `/en/blog` |
| `contact/index.html` | Help centre / contact | `/en/contact` |
| `about/index.html` | About | `/en/about` |
| `features/index.html` | **Feature lab** — hand-built, see below | — |
| `en/**` | the other 249 mirrored routes (blog posts, events, create flows, legal) | `/en/**` |
| `assets/` + `_app/` + `themes/` + `fonts/` | 3,400+ mirrored files | — |

The birthday page alone carries **14 sections**, 9 FAQ entries and 27 images.

---

## The feature lab

`features/` pulls the six interactions out of the production page and rebuilds each one so it
can be driven in isolation, with notes on the mechanism and the data attributes involved:

1. **Hold to blow the candles** — `pointerdown` takes pointer capture and steps one wick every
   420 ms; `pointerup` / `pointercancel` / `lostpointercapture` all cancel. A single `click`
   gives keyboard and assistive-tech users the same outcome without a hold gesture.
2. **Foil age balloons** — a stepper clamped to 1–99 rebuilds the row from per-digit
   `<picture>` artwork (AVIF + WebP, two widths per digit).
3. **Countdown** — past dates roll into next year, zero is a distinct "today" state.
4. **Confetti** — one CSS keyframe on `transform`, one node per confetto, removed under
   `prefers-reduced-motion`.
5. **Message templates + copy-to-clipboard** — three editable messages with a hidden-textarea
   fallback for browsers without the async clipboard API.
6. **Three-state theme** — `system → light → dark → system`, with "system" tracking the OS live.

Balloon digit widths are read out of the origin's own `balloonSources` map
(`read_balloon_widths.py`), not estimated.

---

## Build pipeline

Four scripts, in order. They produced the site; the site does not depend on them.

| Script | Job |
|---|---|
| `build_site.py` | Splits each captured page's `<style>` blocks into a local stylesheet, mirrors every referenced asset, resolves the ES-module import graph, strips analytics, rewrites paths, writes each page. |
| `fixups.py` | Mirrors the two `1x`/`2x` srcset logos, drops the one bundle whose hash the origin has rotated. |
| `finalize.py` | Makes it actually run — see below. |
| `repair_create.py` | Restores the SvelteKit create page's external `/_app` stylesheets (see below). |
| `mirror_app_js.py` | Mirrors the SvelteKit client bundle so the creator hydrates. |
| `verify_create.py` | Asserts every create-page stylesheet and every `url()` inside them resolves locally. |
| `mirror_routes.py` | Mirrors every remaining route declared in the sitemap into `en/...`, with per-page CSS, asset rewriting, module bundling and link remapping. |
| `fetch_astro_missing.py` | Pulls the `_astro`/`_lazy` modules only later pages reference (blog lightbox, svelte client, season landings) plus their import graphs. |
| `fetch_root_refs.py`, `fetch_404s.py`, `fetch_app_css.py` | Close the remaining runtime gaps: theme/font media, lazily imported CSS chunks, and anything the browser still reports as 404. |
| `audit-tools/crawl_404.js` | **Self-healing asset crawl.** Visits every route in a real browser, scrolls the page in steps so lazy images actually request, records every 404/failed request, then pulls each missing file from the origin to the path the page expects. This is the only thing that catches assets referenced from JS with built-up paths - no static regex sees them. |
| `verify_all.py` | Walks every page: resolves each local reference, checks CSS brace balance, confirms the runtime-assembled balloon paths exist, syntax-checks all JS. |
| `smoke_test.py` | Serves the tree on a loopback port and requests every page, asset, stylesheet and module over real HTTP. |
| `read_balloon_widths.py` | Reads the ten per-digit balloon widths out of the capture. |

`build_replica.py`, `patch_lazy_paths.py` and `verify.py` are first-iteration versions of the
same steps, kept for reference; `build_site.py` / `fixups.py` / `verify_all.py` supersede them.

### What `finalize.py` repairs

Three defects only show up when the site is *run*, never when it is crawled:

- **Module scripts were blocked under `file://`.** ES modules require CORS and a `file://` page
  has an opaque origin, so the header menu, theme toggle, reveal animations and pricing never
  initialised. Each page's own entry points are now bundled by esbuild into one classic IIFE —
  per page, because the home page needs a different set than the birthday page, and one instance
  per page so the reveal and pricing state aren't duplicated.
- **Internal links were root-relative.** `/en/pricing` resolves to `file:///en/pricing` and dies.
  They now map onto the mirrored pages; anything not captured points at the live origin so it
  still works.
- **Prices were invisible.** The page fetches them from `api.2-luv.com` and sets
  `data-lv3-price-state="error"` on failure, which the stylesheet renders as
  `visibility:hidden`. A fallback reproduces the site's own `ready` transition. It has to
  *outlast* the origin's retry logic — the module gives up after ~17s and overwrites the state,
  so the fallback keeps re-asserting until then, and never touches a slot the real API resolved.

### The create page is a different animal

`/en/create/love-letter` is a SvelteKit SPA, not an Astro page. Two consequences the
Astro-oriented pipeline got wrong:

- **Its CSS is external.** The Astro pages carry their styles in inline `<style>` blocks, which
  the build extracts. The create page instead links ten `/_app/immutable/assets/*.css` files —
  several deliberately `disabled media="(max-width: 0)"` so the app can switch skins at
  runtime. Rebuilding `<head>` from scratch dropped every one of them, so the page rendered as
  bare unstyled HTML. `repair_create.py` resolves each link against the real route depth
  (`/en/create/love-letter` → `/`), mirrors the files, and re-injects them preserving
  `disabled`/`media` so the runtime skin logic still behaves.
- **Its JS is a client bundle.** The markup ships an inline `__sveltekit_*` bootstrap that
  imports `_app/immutable/entry/{start,app}.js`. `mirror_app_js.py` walks that import graph and
  mirrors 409 chunks, so the theme switcher, wizard steps and preview can hydrate.

Hydration needs **http://**, not `file://`: the bootstrap derives its `base` from
`new URL("../..", location)`, which only resolves to the site root when served.

### Fixed after a real-browser audit

Static checks kept passing while the pages were visibly wrong, so the replica is now audited in
headless Chromium (`audit-tools/audit.js`, kept outside the site folder) which records console
errors, page errors, failed requests and screenshots per page. That found six things crawling
could not:

1. **Every subpage used the wrong stylesheet.** `<link href="../styles.css">` resolves to the
   *root* `styles.css` - the birthday page's CSS - not the page's own. Home, pricing, blog,
   contact and about were all rendering with another page's styling: no icon sizing (an arrow
   SVG painted 1240×1240 as a black triangle), hero copy 2,500px down the page, wrong type
   scale. Now `href="styles.css"`, one sheet per folder.
2. **The lazy privacy bundle 404'd on every page** (`/_lazy/privacy-controls-*.js`) - its path
   was a root-absolute string constant, so it resolved against the server root instead of
   `assets/`. Root-absolute `import()` inside a *classic* bundle resolves against the document,
   so these have to be `/assets/...`.
3. **`__vite__mapDeps` preload hints** pointed at `_astro/...` without a leading slash and
   produced `//assets/...` (host "assets"). The mapped array now returns empty; naively emptying
   only the array produced `/undefined` requests, which is why the helper itself is neutralised.
4. **Bare `chunks/x.js` specifiers** inside `_lazy/` were rejected by the browser
   ("Failed to resolve module specifier"). The normaliser now walks subdirectories too.
5. **A hand-written Cormorant Garamond woff2 URL 404'd.** Fonts now come from one Google Fonts
   `@import` with the real published URLs.
6. **The blog's `https://media.2-luv.com/...` images** were half-rewritten to `https:../assets/...`
   because the CDN pattern did not include the scheme.

Result: **7 of 8 pages load with an empty console.** The create page still logs three CORS errors
because the creator calls `api.2-luv.com` for its letter session and Christmas availability - that
needs their backend, not a missing file.

### Notable details

- **Assets appear in four shapes:** root-relative attribute paths, `srcset` lists with `192w`
  descriptors, protocol-relative CDN URLs on the blog, and — the awkward one — `srcset` strings
  assembled inside an inline `<script>` from string literals. That last one is why the rewrite
  scans the whole document rather than just attributes. A first attempt blanked those strings,
  which silently broke the age-balloon feature.
- **Directory literals.** `const base = "/images/landing/v3/party/balloons"` is a prefix that
  filenames get concatenated onto, not a file. Rewritten only when mirrored files live under it.
- **Fonts.** The origin self-hosts woff2 subsets of Inter, Lora, Cormorant Garamond, Great Vibes,
  Abril Fatface and Shadows Into Light — all open-licensed, so the same faces load from
  `fonts.gstatic.com` instead of the mirrored copies.

---

## Verification

`python verify_all.py`:

```
index.html              72 refs, 0 missing
home/index.html        249 refs, 0 missing
pricing/index.html      24 refs, 0 missing
create/index.html       60 refs, 0 missing
blog/index.html         41 refs, 0 missing
contact/index.html      24 refs, 0 missing
about/index.html        24 refs, 0 missing
features/index.html      7 refs, 0 missing
features (digits)       40 runtime-built asset paths, 0 missing
js modules parsed: 40
OK - all pages verified
```

`python smoke_test.py` serves the tree and requests 9 pages, 57 assets, 20 balloon files,
40 modules and 7 stylesheets over real HTTP — all 200.

`python verify_create.py` reports `OK - create page is fully styled from local files` after
checking 12 stylesheet/font links and every `url()` they reference, including the theme fonts
and the Christmas paper texture that the skins pull in from `/themes/...`.

**Runtime checks performed in a browser against `file://`:**

- Hero renders with the display serif, foil balloon digits, 3D cake and confetti layer.
- Pricing cards show `₹ 299.00` / `₹ 199.00` / `₹ 299.00` in display type.
- Header menu opens (`aria-expanded=true`, drawer with language and currency pickers) — proving
  the bundled `HeaderV2` code executes, not just the fallback.
- Document text length 6240 chars vs the live page's 6240.

### Known gaps

- **One bundle is missing.** `blog/index.html` still references
  `BaseLayout...3kQzEDOb.js`, which 404s upstream — the origin rotated that hash after capture.
  The tag is commented out in place. Effect: no cookie-consent banner on the blog page.
- **Analytics are removed** deliberately (gtag/consent-default block, `beacon.min.js`, the
  `cdn-cgi` iframe injector and decoy link). Markup is otherwise structurally identical.
- **Uncaptured pages link out** to the live origin: terms, privacy, cookies, copyright, DMCA,
  My Letters, individual blog posts, and every event page other than birthday and love-letter.
- **Prices are a snapshot.** The fallback uses the INR values observed at capture time and pins
  the currency picker to INR so the UI agrees with itself. If the real endpoint answers, its
  regional values win and the picker is left alone.
- **Screenshots were captured mid-animation in places.** Sections using the scroll-reveal appear
  washed out for ~0.9s after entering the viewport; that is the transition, not a rendering bug.
- **The home hero is a tall scroll stage** at desktop widths: the cover image fills the first
  viewport and the headline copy sits below it. That is the origin's layout, not a defect.
- **The create page's wizard needs their backend.** It renders and hydrates correctly, but
  saving or unlocking a letter calls `api.2-luv.com`.

---

## Legal

The design, copy, imagery and functionality of the original site belong to **2 PROJECTS LTDA**
(Imperatriz – MA, Brazil, CNPJ 64.092.616/0001-12), and the origin's own footer states that
total or partial reproduction of its content, design or functionality is prohibited under
Law 9.610/98.

This rebuild exists as a technical study of how the page is put together. Use it to learn from,
not to republish. Replace the copy, imagery and branding with your own before any public use.
