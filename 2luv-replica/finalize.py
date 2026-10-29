#!/usr/bin/env python
"""
Finalise the replica so it runs when opened straight from disk, not only served.

Three defects only appear at runtime, never in a crawler:

1. ES module scripts are blocked under file:// (opaque origin, CORS), so the
   header menu, theme toggle, reveal animations and pricing never initialised.
   Each page's own module entry points are bundled by esbuild into one classic
   IIFE per page - a single shared module instance, original load order, and no
   cross-page borrowing (the home page needs a different set than the birthday
   page).

2. Internal links were still root-relative (/en/pricing), which resolves to
   file:///en/pricing and dies. They are remapped onto the mirrored pages;
   anything not captured points at the live origin so it still works.

3. Prices come from https://api.2-luv.com/api/pricing/landing and the site hides
   the slot outright on failure. A fallback reproduces the site's own "ready"
   transition so the cards still show a price offline.

Run after build_site.py and fixups.py.
"""
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")
ORIGIN = "https://www.2-luv.com"

PAGES = ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
         "blog/index.html", "contact/index.html", "about/index.html"]

# Mirrored pages. "/en" matches only exactly - as a prefix it would swallow
# /en/privacy, /en/cookies and every other page that was never captured.
EXACT_ROUTES = {"/en": "home"}

PREFIX_ROUTES = {
    "/en/event/birthday": "birthday",
    "/en/event/love-letter": "create",
    "/en/create": "create",
    "/en/pricing": "pricing",
    "/en/blog": "blog",
    "/en/contact": "contact",
    "/en/about": "about",
}

# Prices observed on the live site (INR region) at capture time. Only used when
# the upstream pricing API cannot be reached from the local copy.
FALLBACK_PRICES = {"party": "\u20b9 299.00", "letter": "\u20b9 199.00", "bundle": "\u20b9 299.00"}

PRICE_PAGES = ("index.html", "home/index.html", "pricing/index.html")

# The origin's pricing endpoint rejects cross-origin requests from localhost, so
# every page that asks for it logs a CORS error and falls back. Serving the same
# payload from the replica removes the error and lets the page's own pricing code
# run normally (formatting, region label, ready state) instead of being patched.
PRICING_STUB = {
    "letter": {"formatted": "\u20b9 199.00", "priceAmount": 199, "currency": "INR"},
    "bundle": {"formattedBundle": "\u20b9 299.00"},
    "themes": {
        "party": {"formatted": "\u20b9 299.00", "priceAmount": 299, "currency": "INR"},
    },
    "regionCode": "IN",
}


def write_pricing_stub():
    path = os.path.join(ASSETS, "pricing.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(PRICING_STUB, fh, ensure_ascii=False, indent=2)
    return path


# --------------------------------------------------------------------- helpers
def local_target(page, key):
    depth = page.count("/")
    up = "../" * depth
    if key == "birthday":
        return (up + "index.html") if depth else "index.html"
    return "%s%s/index.html" % (up, key)


def relink(page, html):
    stats = {"local": 0, "external": 0}

    def replace(match):
        href = match.group(1)
        path, sep, frag = href.partition("#")
        base, qsep, query = path.partition("?")
        base = base.rstrip("/") or "/en"

        best = EXACT_ROUTES.get(base)
        if not best:
            for route in sorted(PREFIX_ROUTES, key=len, reverse=True):
                if base == route or base.startswith(route + "/"):
                    best = PREFIX_ROUTES[route]
                    break

        if best:
            stats["local"] += 1
            url = local_target(page, best)
            if sep:
                url += "#" + frag
            elif qsep:
                url += "?" + query
            return 'href="%s"' % url

        stats["external"] += 1
        return 'href="%s%s"' % (ORIGIN, href)

    html = re.sub(r'href="(/en[^"]*)"', replace, html)
    return html, stats


def normalize_imports():
    """Make every intra-asset reference resolvable from the bundle's location.

    Two things need fixing after mirroring:
      * bare specifiers like "reveal.js" - bundlers read those as package names,
        so they get an explicit ./
      * root-absolute constants like "/_lazy/privacy-controls.js" and the
        __vite__mapDeps arrays ("/_astro/config.js"). Those are fetched at runtime
        relative to the *page*, which 404s once everything lives under assets/.
        Rewriting to ../<dir>/file makes them correct from assets/_bundle/, where
        the bundle actually sits.
    """
    spec = re.compile(r'(\bfrom\s*|\bimport\s*\(?\s*)(["\'])([A-Za-z0-9._\-]+(?:/[A-Za-z0-9._\-]+)*\.js)\2')

    def fix_spec(m):
        """Prefix ./ unless the specifier is already rooted.

        SvelteKit-style bundles use bare directory specifiers like
        "chunks/x.js", which the browser rejects outright with
        'Failed to resolve module specifier'.
        """
        s = m.group(3)
        if s.startswith(("/", "./", "../")):
            return m.group(0)
        return m.group(1) + m.group(2) + "./" + s + m.group(2)

    # Both "_astro/x.js" and "/_astro/x.js" occur (the __vite__mapDeps arrays omit
    # the leading slash). Dynamic import() inside a *classic* bundle resolves
    # against the document URL, not the script, so a relative path lands at
    # /_astro/x.js -> 404. Root-absolute /assets/... is correct wherever the page
    # sits, as long as it is served (which is the documented way to run this).
    absolute = re.compile(r'(["\'])/?((?:_astro|_lazy)/[A-Za-z0-9._\-]+\.(?:js|css))\1')

    # The __vite__mapDeps array only drives <link rel=modulepreload> hints for
    # modules esbuild has already inlined, and the helper mangles the paths into
    # //assets/... . Emptying the array is not enough - i.map(d => d[i]) would then
    # yield [undefined, ...] and request /undefined - so neutralise the mapping.
    deps = re.compile(r'__vite__mapDeps\s*=\s*\(.*?=>\s*\w+\.map\(\s*\(?\w+\)?\s*=>\s*\w+\[\w+\]\);', re.S)

    touched = 0
    for folder in ("_astro", "_lazy"):
        root = os.path.join(ASSETS, folder)
        if not os.path.isdir(root):
            continue
        # recursive: _lazy/chunks/*.js carry their own bare sibling imports
        for dirpath, _dirs, files in os.walk(root):
            for name in files:
                if not name.endswith(".js"):
                    continue
                path = os.path.join(dirpath, name)
                text = open(path, encoding="utf-8").read()
                fixed = spec.sub(fix_spec, text)
                fixed = absolute.sub(lambda m: m.group(1) + "/assets/" + m.group(2) + m.group(1), fixed)
                fixed = deps.sub("__vite__mapDeps = () => [];", fixed)
                if fixed != text:
                    open(path, "w", encoding="utf-8").write(fixed)
                    touched += 1
    print("   normalised imports in %d module(s)" % touched)


def bundle(key, srcs):
    """Bundle one page's module entries into a classic IIFE. Returns local path."""
    lines = []
    for src in srcs:
        name = os.path.basename(src)
        if os.path.isfile(os.path.join(ASSETS, "_astro", name)):
            lines.append('import "../_astro/%s";' % name)
    if not lines:
        return None

    bundle_dir = os.path.join(ASSETS, "_bundle")
    os.makedirs(bundle_dir, exist_ok=True)
    entry = os.path.join(bundle_dir, "entry-%s.js" % key)
    open(entry, "w", encoding="utf-8").write("\n".join(lines) + "\n")

    out = os.path.join(bundle_dir, "%s.js" % key)
    cmd = ("npx --yes esbuild assets/_bundle/entry-%s.js --bundle --format=iife "
           "--target=es2020 --log-level=error --outfile=assets/_bundle/%s.js" % (key, key))
    res = subprocess.run(cmd, cwd=HERE, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        print("   !! bundle failed for %s" % key)
        print(res.stderr[:800])
        return None

    chk = subprocess.run("node --check assets/_bundle/%s.js" % key,
                         cwd=HERE, capture_output=True, text=True, shell=True)
    if chk.returncode != 0:
        print("   !! bundle does not parse: %s" % key)
        return None

    return "assets/_bundle/%s.js" % key


PRICE_FALLBACK = """
<script>
/* Pricing fallback ---------------------------------------------------------
   The origin fetches prices from https://api.2-luv.com/api/pricing/landing and
   sets data-lv3-price-state="error" when that call fails, which the stylesheet
   renders as visibility:hidden - so the cards show no price at all on a local
   copy. This reproduces the site's own "ready" transition using the prices
   observed at capture time.

   Timing matters: the origin retries once, so it can still be loading when this
   first runs and will overwrite the state with "error" afterwards. The loop
   therefore keeps re-asserting until the module gives up, and never touches a
   slot that the real endpoint has already resolved. */
(function () {
  var FALLBACK = %(prices)s;
  var started = Date.now();
  var DEADLINE = 20000;

  function apply() {
    var slots = document.querySelectorAll('[data-lv3-price]');
    if (!slots.length) return;
    for (var i = 0; i < slots.length; i++) {
      var el = slots[i];
      var price = FALLBACK[el.dataset.lv3Price];
      var state = price ? 'ready' : 'missing';
      el.dataset.lv3PriceState = state;
      el.classList.remove('lv3-price-skeleton');
      if (price) {
        var tpl = el.dataset.lv3Template;
        el.textContent = tpl ? tpl.replace('{price}', price) : price;
      }
      var wrap = el.closest('[data-lv3-price-wrap]');
      if (wrap) wrap.dataset.lv3PriceState = state;
    }
    var status = document.querySelectorAll('[data-lv3-price-status]');
    for (var j = 0; j < status.length; j++) {
      status[j].setAttribute('aria-busy', 'false');
      status[j].dataset.lv3PriceState = 'ready';
    }
    document.documentElement.dataset.lv3Pricing = 'ready';

    // The prices above are the INR ones observed at capture time, so line the
    // currency picker up with them instead of leaving it on the default USD.
    var select = document.querySelector('[data-header-region]');
    var option = select && select.querySelector('option[value="IN"]');
    if (option) {
      var label = option.textContent.trim();
      var selects = document.querySelectorAll('[data-header-region]');
      for (var k = 0; k < selects.length; k++) selects[k].value = 'IN';
      var labels = document.querySelectorAll('[data-header-currency]');
      for (var n = 0; n < labels.length; n++) labels[n].textContent = label;
    }
  }

  function tick() {
    if (document.documentElement.dataset.lv3Pricing !== 'ready') apply();
    if (Date.now() - started > DEADLINE) {
      clearInterval(timer);
      if (document.documentElement.dataset.lv3Pricing !== 'ready') apply();
    }
  }

  var timer = setInterval(tick, 400);
  tick();
})();
</script>
"""


THEME_BOOT = """<script>
/* Theme bootstrap ----------------------------------------------------------
   The origin applies the stored/system theme from its header bundle. If that
   bundle is delayed (or fails), the page stays in the CSS light default and
   every theme-dependent surface drifts from the real site - on the home page
   that means the "day" hero image instead of the dark "love" table. This runs
   before the stylesheet so there is no flash either. */
(function () {
  try {
    var stored = window.localStorage.getItem('theme');
    var theme = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
    var dark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.dataset.theme = theme;
    root.dataset.resolvedTheme = dark ? 'dark' : 'light';
    root.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
</script>
"""


def main():
    print("== normalising module specifiers ==")
    normalize_imports()
    write_pricing_stub()

    print("== bundling per page ==")
    for page in PAGES:
        path = os.path.join(HERE, page.replace("/", os.sep))
        if not os.path.isfile(path):
            print("   skip (missing) %s" % page)
            continue

        html = open(path, encoding="utf-8").read()
        original = html
        key = "root" if page == "index.html" else page.split("/")[0]
        up = "../" * page.count("/")

        # ---- 1. collect this page's own module entries --------------------
        srcs = re.findall(r'<script[^>]*type="module"[^>]*src="([^"]+)"', html)
        local_srcs = [s for s in srcs if not s.startswith("http")]
        bundle_path = bundle(key, local_srcs) if local_srcs else None

        # ---- 2. swap the module tags for one classic script ---------------
        def drop_module(m):
            attrs = m.group(1)
            if 'type="module"' in attrs and "src=" in attrs:
                return ""
            return m.group(0)

        html = re.sub(r'<script\b([^>]*)>\s*</script>', drop_module, html)
        if bundle_path:
            html = html.replace(
                "</body>",
                '<script defer src="%s%s"></script>\n</body>' % (up, bundle_path), 1)

        # ---- 3. inline modules -> classic IIFE ---------------------------
        def inline_to_classic(m):
            body = m.group(1).strip()
            return ("<script>\n/* converted from type=module so it also runs under file:// */\n"
                    "(function(){'use strict';\n" + body + "\n})();\n</script>")

        html = re.sub(r'<script type="module">(.*?)</script>', inline_to_classic, html, flags=re.S)

        # ---- 4. internal links -------------------------------------------
        html, stats = relink(page, html)

        # ---- 5b. theme bootstrap ------------------------------------------
        if "Theme bootstrap" not in html:
            html = re.sub(r"(<head>)", r"\1\n" + THEME_BOOT.replace("\\", "\\\\"), html, count=1)

        # ---- 5. pricing fallback -----------------------------------------
        # same-origin stub first, so the page's own pricing code succeeds
        html = html.replace("https://api.2-luv.com/api/pricing/landing",
                            "/assets/pricing.json")
        if page in PRICE_PAGES and "Pricing fallback" not in html:
            html = html.replace("</body>",
                                (PRICE_FALLBACK % {"prices": json.dumps(FALLBACK_PRICES)}) + "\n</body>", 1)

        if html != original:
            open(path, "w", encoding="utf-8").write(html)

        size = os.path.getsize(os.path.join(HERE, bundle_path)) / 1024 if bundle_path else 0
        print("   %-22s entries:%d -> %-28s %5.1f KB  links local:%d external:%d"
              % (page, len(local_srcs), bundle_path or "(none)", size,
                 stats["local"], stats["external"]))


if __name__ == "__main__":
    main()
    print("\ndone")
