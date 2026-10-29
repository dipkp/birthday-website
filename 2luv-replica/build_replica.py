#!/usr/bin/env python
"""
Reverse-engineer build for the 2luv.com birthday page.

Reads the captured source HTML (../2luv_birthday.html), then:
  1. splits <style> blocks into a local stylesheet
  2. downloads every referenced image / font / JS module locally (recursive for JS imports)
  3. rewrites absolute asset paths (/images/..., /_astro/..., /fonts/...) to local copies
  4. strips analytics, Cloudflare beacons and tracking scripts
  5. writes a runnable index.html
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "2luv_birthday.html")
ORIGIN = "https://www.2-luv.com"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)

# ---------------------------------------------------------------- fetch cache
_cache = {}


def fetch(path_or_url, binary=True):
    """Fetch a site-relative path or absolute URL, caching by URL."""
    url = path_or_url if path_or_url.startswith("http") else ORIGIN + path_or_url
    if url in _cache:
        return _cache[url]
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
    except Exception as exc:  # keep the build going, report at the end
        print("  !! fetch failed %s (%s)" % (url, exc))
        data = None
    _cache[url] = data
    return data


def save(rel_path, data):
    dest = os.path.join(HERE, rel_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    mode = "wb" if isinstance(data, bytes) else "w"
    with open(dest, mode) as fh:
        fh.write(data)
    return dest


# ---------------------------------------------------------------- 1. read src
with open(SRC, "r", encoding="utf-8") as fh:
    html = fh.read()

print("source: %d bytes" % len(html))

# ---------------------------------------------------------------- 2. styles
styles = re.findall(r"<style[^>]*>(.*?)</style>", html, re.S)
css_bundle = "\n\n".join(s.strip() for s in styles if s.strip())
print("style blocks: %d (%d bytes)" % (len(styles), len(css_bundle)))

# local @font-face rules replace the site's /fonts/ URLs with Google-hosted faces
FONT_CSS = """/* ---- font faces: swapped from the origin's self-hosted woff2 to Google Fonts ----
   Inter, Lora, Cormorant Garamond, Great Vibes, Abril Fatface and Shadows Into Light
   are all open-licensed (OFL) and served by fonts.googleapis.com. */
@font-face{font-family:Inter;font-style:normal;font-weight:400 700;font-display:optional;
  src:url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format("woff2");}
@font-face{font-family:Lora;font-style:normal;font-weight:400 700;font-display:optional;
  src:url(https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuMwr7I_FMl_E.woff2) format("woff2");}
@font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:400 700;font-display:swap;
  src:url(https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYp3tKgQ.woff2) format("woff2");}
@font-face{font-family:'Great Vibes';font-style:normal;font-weight:400;font-display:swap;
  src:url(https://fonts.gstatic.com/s/greatvibes/v18/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.woff2) format("woff2");}
@font-face{font-family:'Abril Fatface';font-style:normal;font-weight:400;font-display:swap;
  src:url(https://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchq-dmjQ.woff2) format("woff2");}
@font-face{font-family:'Shadows Into Light';font-style:normal;font-weight:400;font-display:swap;
  src:url(https://fonts.gstatic.com/s/shadowsintolight/v19/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQzdcD5.woff2) format("woff2");}
/* --------------------------------------------------------------------------- */
"""

# drop the origin's own @font-face blocks, keep everything else
css_bundle = re.sub(r"@font-face\{[^}]*\}", "", css_bundle)
css_bundle = FONT_CSS + css_bundle

# ---------------------------------------------------------------- 3. body html
body_start = html.index("<body")
body_open_end = html.index(">", body_start) + 1
body_end = html.rindex("</body>")
body = html[body_open_end:body_end]
head = html[:body_start]

print("body: %d bytes" % len(body))

# ---------------------------------------------------------------- 4. strip tracking
# analytics bootstrap (gtag / consent default / safe analytics context)
body = re.sub(r"<script data-astro-rerun>\(function\(\)\{const googleTagManagerId.*?</script>", "", body, flags=re.S)
# cloudflare rocket-loader challenge iframe injector
body = re.sub(r"<script>\(function\(\)\{function c\(\).*?</script>", "", body, flags=re.S)
# cloudflare bot-check decoy link
body = re.sub(r'<a href="https://www\.2-luv\.com/cdn-cgi/content\?[^"]*"[^>]*></a>', "", body)
# cloudflare beacon
body = re.sub(r'<script type="module" src="https://static\.cloudflareinsights\.com[^"]*"[^>]*></script>', "", body)

# ---------------------------------------------------------------- 5. assets
# 5a. images referenced anywhere in the body / css
asset_paths = set()
for match in re.finditer(r'(?:src|srcset|poster)="([^"]+)"', body):
    asset_paths.add(match.group(1))
for match in re.finditer(r"url\((/images/[^)\"']+)\)", css_bundle):
    asset_paths.add(match.group(1))

# srcset values hold several "path 123w" entries
expanded = set()
for value in asset_paths:
    if value.startswith("http") or value.startswith("data:") or value.startswith("/_astro"):
        continue
    if re.search(r"\s+\d+w", value):
        for part in value.split(","):
            part = part.strip().split(" ")[0]
            if part:
                expanded.add(part)
    elif value.startswith("/"):
        expanded.add(value)

print("images to mirror: %d" % len(expanded))
mirrored = {}
failed = []
for path in sorted(expanded):
    clean = path.split("?")[0]
    data = fetch(path)
    if data is None:
        failed.append(path)
        continue
    # keep the query string out of the local name; keep the extension
    local = "assets" + clean
    if not os.path.splitext(local)[1]:
        local += ".bin"
    save(local, data)
    mirrored[path] = local
    mirrored[clean] = local

# 5b. JS modules, resolved recursively (astro bundles import each other relatively)
script_srcs = re.findall(r'<script[^>]*src="(/_astro/[^"]+)"', body)
print("js entry points: %d" % len(script_srcs))

js_seen = {}
queue = list(script_srcs)
while queue:
    src = queue.pop(0)
    if src in js_seen:
        continue
    if src.startswith("http"):
        continue
    data = fetch(src)
    if data is None:
        failed.append(src)
        js_seen[src] = None
        continue
    text = data.decode("utf-8", "replace")
    local = "assets" + src.split("?")[0]
    save(local, data)
    js_seen[src] = local
    base = src.rsplit("/", 1)[0]
    # follow every specifier shape an astro bundle uses:
    #   import x from "./a.js"  /  import"./a.js"  /  import("./a.js")
    #   and lazily referenced bundles held in plain string constants ("/_lazy/...", "/_astro/...")
    specs = []
    specs += re.findall(r'from\s*["\']([^"\']+)["\']', text)
    specs += re.findall(r'import\s*\(\s*["\']([^"\']+)["\']\s*\)', text)
    specs += re.findall(r'import\s*["\']([^"\']+)["\']', text)
    specs += re.findall(r'["\'](/(?:_lazy|_astro)/[A-Za-z0-9._\-]+\.js)["\']', text)
    for spec in specs:
        if spec.startswith("./") or spec.startswith("../"):
            resolved = os.path.normpath(os.path.join(base, spec)).replace(os.sep, "/")
            if not resolved.startswith("/"):
                resolved = "/" + resolved
            queue.append(resolved)
        elif spec.startswith("/_lazy/") or spec.startswith("/_astro/"):
            queue.append(spec)

# 5c. rewrite references in the HTML and CSS
def rewrite(value):
    if value.startswith("http") or value.startswith("data:") or value.startswith("#"):
        return value
    if re.search(r"\s+\d+w", value):  # srcset list
        out = []
        for part in value.split(","):
            part = part.strip()
            if not part:
                continue
            bits = part.split(" ")
            bits[0] = rewrite(bits[0])
            out.append(" ".join(bits))
        return ", ".join(out)
    clean = value.split("?")[0]
    return mirrored.get(value) or mirrored.get(clean) or value

for original, local in sorted(mirrored.items(), key=lambda kv: -len(kv[0])):
    if original.startswith("/_astro"):
        continue
    body = body.replace('"%s"' % original, '"%s"' % local)

for src, local in js_seen.items():
    if local:
        body = body.replace('src="%s"' % src, 'src="%s"' % local)
    else:
        body = re.sub(r'<script[^>]*src="%s"[^>]*></script>' % re.escape(src), "", body)

# 5d. point in-page navigation at the live origin so the links still work
body = re.sub(r'href="/(en|pt|es|fr|de|it|ja|ko|zh|zh-tw|ar|ru|ms|hi|id|tr|pl|nl|sv|da|fi|no|cs|ro|hu|el|he|th|vi|uk)/', lambda m: 'href="%s/%s/' % (ORIGIN, m.group(1)), body)

# 5e. rewrite relative module imports inside the mirrored JS so they resolve locally
for src, local in js_seen.items():
    if not local:
        continue
    path = os.path.join(HERE, local.replace("/", os.sep))
    with open(path, "r", encoding="utf-8") as fh:
        text = fh.read()
    base = src.rsplit("/", 1)[0]

    def fix(spec, text=text, base=base):
        if not (spec.startswith("./") or spec.startswith("../")):
            return spec
        resolved = os.path.normpath(os.path.join(base, spec)).replace(os.sep, "/")
        if not resolved.startswith("/"):
            resolved = "/" + resolved
        target = js_seen.get(resolved)
        if not target:
            return spec
        return os.path.relpath(
            os.path.join(HERE, target.replace("/", os.sep)),
            os.path.dirname(path),
        ).replace(os.sep, "/")

    text = re.sub(r'(from\s*")([^"]+)(")', lambda m: m.group(1) + fix(m.group(2)) + m.group(3), text)
    text = re.sub(r'(import\(\s*")([^"]+)("\s*\))', lambda m: m.group(1) + fix(m.group(2)) + m.group(3), text)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)

# ---------------------------------------------------------------- 6. head
# keep only the metadata that still makes sense offline
title = re.search(r"<title>(.*?)</title>", head, re.S)
desc = re.search(r'<meta name="description" content="([^"]*)"', head)
title_txt = title.group(1).strip() if title else "2luv birthday"
desc_txt = desc.group(1) if desc else ""

new_head = """<!doctype html>
<html lang="en-US" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<meta name="description" content="%s">
<meta name="robots" content="noindex,nofollow">
<link rel="icon" href="assets/icons/favicon.svg">
<link rel="apple-touch-icon" href="assets/icons/apple-icon-180x180.png">
<link rel="stylesheet" href="styles.css">
<!--
  Reverse-engineered static replica of https://www.2-luv.com/en/event/birthday
  Built for layout / interaction study. All copy, imagery and design remain the
  property of 2 PROJECTS LTDA. Not for republication - see README.md.
-->
</head>
""" % (title_txt, desc_txt)

# favicon + manifest are worth mirroring too
for icon in ["/icons/favicon.svg", "/icons/apple-icon-180x180.png", "/favicon.ico"]:
    data = fetch(icon)
    if data:
        save("assets" + icon, data)

# ---------------------------------------------------------------- 7. write
with open(os.path.join(HERE, "styles.css"), "w", encoding="utf-8") as fh:
    fh.write(css_bundle)
with open(os.path.join(HERE, "index.html"), "w", encoding="utf-8") as fh:
    fh.write(new_head + "<body>\n" + body.strip() + "\n</body>\n</html>\n")

print("\n--- done ---")
print("index.html   %d bytes" % os.path.getsize(os.path.join(HERE, "index.html")))
print("styles.css   %d bytes" % os.path.getsize(os.path.join(HERE, "styles.css")))
print("assets       %d files" % sum(len(f) for _, _, f in os.walk(os.path.join(HERE, "assets"))))
if failed:
    print("\nfailed (%d):" % len(failed))
    for item in failed:
        print("  " + item)
with open(os.path.join(HERE, "asset-map.json"), "w", encoding="utf-8") as fh:
    json.dump(mirrored, fh, indent=2, sort_keys=True)
