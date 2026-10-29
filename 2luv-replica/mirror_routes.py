#!/usr/bin/env python
"""
Mirror every English route the origin declares.

The seven hand-tuned pages are left alone; everything else in routes_en.json is
fetched and rebuilt into a folder that mirrors the origin's path
(/en/privacy -> en/privacy/, /en/blog/<slug> -> en/blog/<slug>/).

For each page it: extracts the <style> blocks to a per-folder styles.css, strips
analytics, mirrors every referenced asset into the shared assets/ tree, bundles
that page's module entry points into a classic IIFE (so the page runs from a
classic script and dedupes shared modules), converts inline modules, applies the
theme bootstrap and the local pricing stub, and remaps internal links onto the
mirrored folders.

Usage:  python mirror_routes.py [--limit N]
"""
import hashlib
import json
import os
import re
import subprocess
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# route -> existing hand-built folder (kept as-is)
SPECIAL = {
    "/en": "home",
    "/en/": "home",
    "/en/event/birthday": "",
    "/en/pricing": "pricing",
    "/en/blog": "blog",
    "/en/contact": "contact",
    "/en/about": "about",
    "/en/create/love-letter": "create",
}

ASSET_RE = re.compile(
    r"(?<![A-Za-z0-9.:/])/(?!(?:_astro|_lazy|cdn-cgi)/)[A-Za-z0-9._/~%\-]+\."
    r"(?:avif|webp|png|jpe?g|svg|gif|ico|mp4|webm|woff2?|css)",
    re.I,
)
CDN_RE = re.compile(
    r"(?:https?:)?//((?:media|cdn)\.2-luv\.com)/[A-Za-z0-9._/~%\-]+\."
    r"(?:avif|webp|png|jpe?g|svg|gif|mp4|webm)",
    re.I,
)
FONT_CSS = """/* fonts: open-licensed families, loaded from Google Fonts (origin self-hosts
   the same woff2 subsets under /fonts/). @import must stay first. */
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Shadows+Into+Light&display=swap');
"""

THEME_BOOT = """<script>
/* theme bootstrap: the origin applies stored/system theme from its header bundle */
(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark'||s==='system')?s:'system';
var d=t==='dark'||(t==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);
var r=document.documentElement;r.classList.toggle('dark',d);r.dataset.theme=t;
r.dataset.resolvedTheme=d?'dark':'light';r.style.colorScheme=d?'dark':'light';}catch(e){}})();
</script>
"""

_cache = {}
failed = []
HTML_CACHE = os.path.join(HERE, "_htmlcache")


def fetch_html(path):
    """Raw page HTML, cached outside the served tree.

    Caching it under the site root put a file named en/blog/<slug> where the
    folder for that page needed to go, which then blew up with FileExistsError.
    """
    os.makedirs(HTML_CACHE, exist_ok=True)
    key = hashlib.sha1(path.encode()).hexdigest()
    cached = os.path.join(HTML_CACHE, key + ".html")
    if os.path.isfile(cached):
        return open(cached, "rb").read()
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "text/html"})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
    except Exception:
        failed.append(path)
        return None
    with open(cached, "wb") as fh:
        fh.write(data)
    return data


def fetch(path):
    if path in _cache:
        return _cache[path]
    if not path.startswith("/"):
        return None
    local = os.path.join(HERE, path.lstrip("/").replace("/", os.sep))
    if os.path.isfile(local):
        data = open(local, "rb").read()
        _cache[path] = data
        return data
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            data = resp.read()
    except Exception:
        failed.append(path)
        _cache[path] = None
        return None
    os.makedirs(os.path.dirname(local), exist_ok=True)
    with open(local, "wb") as fh:
        fh.write(data)
    _cache[path] = data
    return data


def put(rel, data):
    dest = os.path.join(HERE, rel.replace("/", os.sep))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data if isinstance(data, bytes) else data.encode("utf-8"))


def out_dir_for(path):
    if path in SPECIAL:
        return SPECIAL[path]
    parts = [p for p in path.split("/") if p]
    return "/".join(parts)          # en/privacy, en/blog/slug ...


def local_url_for(target_dir, page_dir):
    """Relative URL from a page folder to a target folder."""
    if target_dir == "":
        target = "index.html"
    else:
        target = target_dir + "/index.html"
    rel = os.path.relpath(os.path.join(HERE, target.replace("/", os.sep)),
                          os.path.join(HERE, page_dir.replace("/", os.sep)))
    return rel.replace(os.sep, "/")


def strip_tracking(body):
    body = re.sub(r"<script data-astro-rerun>\(function\(\)\{const googleTagManagerId.*?</script>",
                  "", body, flags=re.S)
    body = re.sub(r"<script>\(function\(\)\{function c\(\).*?</script>", "", body, flags=re.S)
    body = re.sub(r'<a href="https://www\.2-luv\.com/cdn-cgi/content\?[^"]*"[^>]*></a>', "", body)
    body = re.sub(r'<script[^>]*src="https://static\.cloudflareinsights\.com[^"]*"[^>]*></script>',
                  "", body)
    body = re.sub(r"<script>\s*\(\(\) => \{[\s\S]*?\}\)\(\);\s*</script>", "", body, count=1)
    return body


signatures = {}


def bundle_for(srcs):
    """Bundle a page's module entries once per unique set."""
    local_srcs = [s for s in srcs if not s.startswith("http")]
    key = tuple(local_srcs)
    if not key:
        return None
    if key in signatures:
        return signatures[key]

    usable = []
    for src in local_srcs:
        name = os.path.basename(src)
        if os.path.isfile(os.path.join(HERE, "assets", "_astro", name)):
            usable.append('../_astro/%s' % name)
    if not usable:
        signatures[key] = None
        return None

    sig = hashlib.sha1("\n".join(local_srcs).encode()).hexdigest()[:8]
    entry = "assets/_bundle/entry-r%s.js" % sig
    with open(os.path.join(HERE, entry.replace("/", os.sep)), "w", encoding="utf-8") as fh:
        fh.write("\n".join('import "%s";' % u for u in usable) + "\n")

    out = "assets/_bundle/r%s.js" % sig
    cmd = ("npx --yes esbuild %s --bundle --format=iife --target=es2020 "
           "--log-level=error --outfile=%s" % (entry, out))
    res = subprocess.run(cmd, cwd=HERE, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        print("   !! bundle failed %s" % sig)
        signatures[key] = None
        return None
    signatures[key] = out
    return out


def build(path, html):
    page_dir = out_dir_for(path)
    depth = len([p for p in page_dir.split("/") if p])
    up = "../" * depth

    styles = re.findall(r"<style[^>]*>(.*?)</style>", html, re.S)
    css = FONT_CSS + re.sub(r"@font-face\{[^}]*\}", "", "\n\n".join(s.strip() for s in styles if s.strip()))

    body_start = html.index("<body")
    body_end = html.rindex("</body>")
    head = html[:body_start]
    body = strip_tracking(html[html.index(">", body_start) + 1:body_end])

    html_tag = re.search(r"<html\b[^>]*>", html)
    body_tag = re.search(r"<body\b[^>]*>", html)
    title = re.search(r"<title>(.*?)</title>", head, re.S)
    desc = re.search(r'<meta name="description" content="([^"]*)"', head)

    # ---- assets -----------------------------------------------------------
    for url in sorted(set(m.group(0) for m in CDN_RE.finditer(body))):
        stripped = re.sub(r"^https?:", "", url)[2:]
        host, _, cdn_path = stripped.partition("/")
        if not os.path.isfile(os.path.join(HERE, "assets", "_cdn", host, cdn_path.replace("/", os.sep))):
            data = fetch("/" + cdn_path)
            if data:
                put("assets/_cdn/%s/%s" % (host, cdn_path), data)
    body = CDN_RE.sub(lambda m: (up + "assets/_cdn/" + re.sub(r"^https?:", "", m.group(0))[2:])
                      if os.path.isfile(os.path.join(
                          HERE, "assets", "_cdn",
                          re.sub(r"^https?:", "", m.group(0))[2:].replace("/", os.sep)))
                      else m.group(0), body)

    filled = {}
    for p in sorted(set(ASSET_RE.findall(body)) | set(ASSET_RE.findall(css))):
        if p not in filled:
            if not os.path.isfile(os.path.join(HERE, "assets", p.lstrip("/").replace("/", os.sep))):
                data = fetch(p)
                if data:
                    put("assets/" + p.lstrip("/"), data)
            filled[p] = up + "assets/" + p.lstrip("/")
    body = ASSET_RE.sub(lambda m: filled.get(m.group(0), m.group(0)), body)
    css = ASSET_RE.sub(lambda m: "../" * (depth + 1) + "assets/" + m.group(0).lstrip("/"), css)

    # ---- modules ----------------------------------------------------------
    # Astro emits the module entry points in <head>; only reading <body> meant
    # occasion/legal pages got no bundle at all and therefore no JavaScript.
    srcs = re.findall(r'<script[^>]*type="module"[^>]*src="([^"]+)"', html)
    bundle = bundle_for(srcs) if srcs else None

    # Inline modules from <head> (theme/locale bootstrap) would otherwise be lost
    # with the head, so carry them over as classic scripts.
    head_end = html.index("<body")
    head_inline = re.findall(r'<script type="module">(.*?)</script>', html[:head_end], re.S)
    carried = "".join(
        "<script>(function(){'use strict';\n%s\n})();</script>\n" % s.strip() for s in head_inline)

    def drop_module(m):
        a = m.group(1)
        return "" if ('type="module"' in a and "src=" in a) else m.group(0)

    body = re.sub(r"<script\b([^>]*)>\s*</script>", drop_module, body)
    if bundle:
        # body excludes </body>, so anchor on the string itself, not on that tag
        body = body.rstrip() + '\n<script defer src="%s%s"></script>\n' % (up, bundle)

    def inline_classic(m):
        return ("<script>\n(function(){'use strict';\n" + m.group(1).strip() + "\n})();\n</script>")

    body = re.sub(r'<script type="module">(.*?)</script>', inline_classic, body, flags=re.S)

    # ---- links ------------------------------------------------------------
    # SvelteKit derives its asset base from new URL("../..", location); on a
    # mirrored page under /en/create/<slug>/ that resolves to /en, so its _app
    # imports 404. Pin the base to the server root, where _app actually lives.
    body = re.sub(r'base:\s*new URL\([^)]*\)\.pathname\.slice\(0,\s*-1\)',
                  'base: ""', body)

    # Astro islands fetch their component at runtime via component-url/renderer-url,
    # which point at /_astro/... - leave those alone and every blog post 404s on its
    # lightbox and its svelte client.
    body = re.sub(
        r'((?:component|renderer|before-hydration|server-renderer)-url)="/_((?:astro|lazy)/[^"]+)"',
        lambda m: '%s="%sassets/_%s"' % (m.group(1), up, m.group(2)), body)

    # SvelteKit pages deeper than /en/ write ../../_app/... which resolves to
    # /en/_app; the app tree lives at the server root.
    body = re.sub(r'(?:\.\./)+_app/', '/_app/', body)

    routes = ALL_PATHS

    def relink(m):
        href = m.group(1)
        base, sep, frag = href.partition("#")
        key = base.rstrip("/") or "/en"
        if key in routes:
            return 'href="%s%s"' % (local_url_for(routes[key], page_dir),
                                    ("#" + frag) if sep else "")
        return 'href="%s%s"' % (ORIGIN, href)

    # any locale prefix, not just /en
    body = re.sub(r'href="(/[a-z]{2}(?:-[a-z]{2})?/[^"]*)"', relink, body)
    body = re.sub(r'href="(/[a-z]{2}(?:-[a-z]{2})?)"', relink, body)

    # ---- pricing + theme --------------------------------------------------
    body = body.replace("https://api.2-luv.com/api/pricing/landing", "/assets/pricing.json")

    out_head = """<!doctype html>
%s
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<meta name="description" content="%s">
<meta name="robots" content="noindex,nofollow">
<link rel="stylesheet" href="styles.css">
%s%s</head>
%s
""" % (html_tag.group(0) if html_tag else '<html lang="en-US" dir="ltr">',
       (title.group(1).strip() if title else "2luv").replace("\n", " "),
       desc.group(1) if desc else "",
       THEME_BOOT,
       carried,
       body_tag.group(0) if body_tag else "<body>")

    put((page_dir + "/" if page_dir else "") + "index.html",
        out_head + body.strip() + "\n</body>\n</html>\n")
    put((page_dir + "/" if page_dir else "") + "styles.css", css)


ROUTES = json.load(open(os.path.join(HERE, "routes_all.json"), encoding="utf-8"))
if "--routes" in sys.argv:
    alt = sys.argv[sys.argv.index("--routes") + 1]
    ROUTES = json.load(open(os.path.join(HERE, alt), encoding="utf-8"))
    print("route list: %s" % alt)

# every declared route -> its folder, used for local link remapping
ALL_PATHS = {}
for _u in ROUTES:
    _p = _u.replace(ORIGIN, "").rstrip("/") or "/en"
    ALL_PATHS[_p] = out_dir_for(_p)
LIMIT = None
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])

todo = []
FORCE = "--force" in sys.argv
for route in ROUTES:
    path = route.replace(ORIGIN, "").rstrip("/") or "/en"
    if path in SPECIAL:
        continue                       # already built and verified by hand
    if not FORCE:
        d = out_dir_for(path)
        done = os.path.join(HERE, (d + "/index.html") if d else "index.html")
        if os.path.isfile(done):       # resume: never redo finished pages
            continue
    todo.append(path)
todo = sorted(set(todo))
if "--only" in sys.argv:
    needle = sys.argv[sys.argv.index("--only") + 1]
    todo = [p for p in todo if needle in p]
if LIMIT:
    todo = todo[:LIMIT]

print("routes to mirror: %d" % len(todo))
ok = 0
for i, path in enumerate(todo, 1):
    data = fetch_html(path)
    if data is None:
        print("  !! %s" % path)
        continue
    try:
        build(path, data.decode("utf-8", "replace"))
        ok += 1
    except Exception as exc:
        print("  !! %s (%s: %s)" % (path, type(exc).__name__, str(exc)[:80]))
    if i % 25 == 0:
        print("   ... %d/%d" % (i, len(todo)))

print("\nmirrored %d/%d pages" % (ok, len(todo)))
if failed:
    print("failed fetches: %d (first 5: %s)" % (len(failed), failed[:5]))
