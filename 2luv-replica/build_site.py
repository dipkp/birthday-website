#!/usr/bin/env python
"""
Build the whole reverse-engineered 2luv site.

Each captured source page is turned into a runnable static page that shares one
mirrored asset tree:

    2luv-replica/
      index.html  styles.css                  <- /en/event/birthday
      home/       index.html  styles.css      <- /en
      pricing/    index.html  styles.css      <- /en/pricing
      create/     index.html  styles.css      <- /en/create/love-letter
      blog/       index.html  styles.css      <- /en/blog
      contact/    index.html  styles.css      <- /en/contact
      about/      index.html  styles.css      <- /en/about
      assets/                                 <- shared images, fonts, js modules
"""
import json
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCE_DIR = os.path.join(HERE, "..")
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# source html, output folder ("" = root), relative prefix to reach assets/
PAGES = [
    ("2luv_birthday.html", "",        ""),
    ("2luv_home.html",     "home",    "../"),
    ("2luv_pricing.html",  "pricing", "../"),
    ("2luv_create.html",   "create",  "../"),
    ("2luv_blog.html",     "blog",    "../"),
    ("2luv_contact.html",  "contact", "../"),
    ("2luv_about.html",    "about",   "../"),
]

FONT_CSS = """/* ---- fonts ---------------------------------------------------------------
   The origin self-hosts woff2 subsets under /fonts/ for Inter, Lora, Cormorant
   Garamond, Great Vibes, Abril Fatface and Shadows Into Light - all open-licensed.
   They are loaded from Google Fonts here, via one @import so the URLs are the
   real published ones rather than hand-guessed file paths (an earlier hand-built
   Cormorant URL 404'd).
   @import must stay the first rule in the stylesheet. */
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Shadows+Into+Light&display=swap');
/* ------------------------------------------------------------------------- */
"""

_cache = {}
failed = []
mirrored = {}          # origin path -> local path relative to replica root

# Any asset path the origin serves, wherever it appears - an HTML attribute, a
# srcset list, a CSS url() or a string literal inside an inline <script>.
# The origin keeps imagery under several roots (/images, /icons, /themes, ...),
# so match any root-relative path with an asset extension and exclude the JS
# bundle trees, which are mirrored separately.
# The lookbehind keeps the pattern off absolute and protocol-relative URLs
# (https://host/x.png, //media.2-luv.com/x.jpg) - those get their own pass.
ASSET_RE = re.compile(
    r"(?<![A-Za-z0-9.:/])/(?!(?:_astro|_lazy|cdn-cgi)/)"
    r"[A-Za-z0-9._/~%\-]+\."
    r"(?:avif|webp|png|jpe?g|svg|gif|ico|mp4|webm|woff2?)",
    re.I,
)

# The blog serves its post imagery from a separate media host, written both as a
# protocol-relative URL (//media.2-luv.com/x.jpg) and as a full absolute one
# (https://media.2-luv.com/x.jpg). The scheme has to be part of the match, or the
# rewrite leaves a dangling "https:" in front of the local path.
CDN_RE = re.compile(
    r"(?:https?:)?//((?:media|cdn)\.2-luv\.com)/[A-Za-z0-9._/~%\-]+\."
    r"(?:avif|webp|png|jpe?g|svg|gif|mp4|webm)",
    re.I,
)

# Directory literals that inline scripts concatenate filenames onto, e.g.
#   const base = "/images/landing/v3/party/balloons"
#   img.src = base + "/digit-" + digit + "-lg.webp"
# These are prefixes of mirrored files rather than files themselves.
DIR_LITERAL_RE = re.compile(r'"(/(?:images|icons|themes|videos|fonts)/[A-Za-z0-9._/\-]+)"(?!\.)')


def fetch(path_or_url):
    """Fetch, preferring an already-mirrored copy on disk over the network."""
    url = path_or_url if path_or_url.startswith("http") else ORIGIN + path_or_url
    if url in _cache:
        return _cache[url]
    if path_or_url.startswith("/"):
        clean = path_or_url.split("?")[0]
        cached = os.path.join(HERE, ("assets" + clean).replace("/", os.sep))
        if os.path.isfile(cached):
            with open(cached, "rb") as fh:
                data = fh.read()
            _cache[url] = data
            return data
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
    except Exception as exc:
        print("     !! %s (%s)" % (url, exc))
        data = None
        failed.append(path_or_url)
    _cache[url] = data
    return data


def save(rel_path, data):
    dest = os.path.join(HERE, rel_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data if isinstance(data, bytes) else data.encode("utf-8"))
    return dest


def strip_tracking(body):
    body = re.sub(r"<script data-astro-rerun>\(function\(\)\{const googleTagManagerId.*?</script>",
                  "", body, flags=re.S)
    body = re.sub(r"<script>\(function\(\)\{function c\(\).*?</script>", "", body, flags=re.S)
    body = re.sub(r"<script data-astro-rerun>\(function\(\)\{const consentValue.*?</script>",
                  "", body, flags=re.S)
    body = re.sub(r'<a href="https://www\.2-luv\.com/cdn-cgi/content\?[^"]*"[^>]*></a>', "", body)
    body = re.sub(r'<script[^>]*src="https://static\.cloudflareinsights\.com[^"]*"[^>]*></script>',
                  "", body)
    # the head-level gtag consent bootstrap
    body = re.sub(r"<script>\s*\(\(\) => \{[\s\S]*?\}\)\(\);\s*</script>", "", body, count=1)
    return body


def mirror_js(script_srcs):
    """Recursively mirror astro/js module bundles, returning origin->local map."""
    js_map = {}
    queue = list(script_srcs)
    while queue:
        src = queue.pop(0)
        if src in js_map or src.startswith("http"):
            continue
        data = fetch(src)
        if data is None:
            js_map[src] = None
            continue
        text = data.decode("utf-8", "replace")
        local = "assets" + src.split("?")[0]
        save(local, data)
        js_map[src] = local
        base = src.rsplit("/", 1)[0]
        specs = []
        specs += re.findall(r'from\s*["\']([^"\']+)["\']', text)
        specs += re.findall(r'import\s*\(\s*["\']([^"\']+)["\']\s*\)', text)
        specs += re.findall(r'import\s*["\']([^"\']+)["\']', text)
        specs += re.findall(r'["\'](/(?:_lazy|_astro)/[A-Za-z0-9._\-]+\.js)["\']', text)
        for spec in specs:
            if spec.startswith(("./", "../")):
                resolved = os.path.normpath(os.path.join(base, spec)).replace(os.sep, "/")
                if not resolved.startswith("/"):
                    resolved = "/" + resolved
                queue.append(resolved)
            elif spec.startswith(("/_lazy/", "/_astro/")):
                queue.append(spec)
    return js_map


def build_page(src_name, slug, prefix):
    src_path = os.path.join(SOURCE_DIR, src_name)
    if not os.path.isfile(src_path):
        print("\n== skip %s (not captured)" % src_name)
        return None
    label = "/" + slug if slug else "/"
    print("\n== %s  ->  %s" % (src_name, label))

    html = open(src_path, encoding="utf-8").read()
    styles = re.findall(r"<style[^>]*>(.*?)</style>", html, re.S)
    css = "\n\n".join(s.strip() for s in styles if s.strip())
    css = FONT_CSS + re.sub(r"@font-face\{[^}]*\}", "", css)

    body_start = html.index("<body")
    body = html[html.index(">", body_start) + 1: html.rindex("</body>")]
    body = strip_tracking(body)
    head = html[:body_start]
    print("   body %d bytes, css %d bytes" % (len(body), len(css)))

    # ---- assets -----------------------------------------------------------
    # Scan the whole document, not just attributes: the balloon feature builds
    # its <source> srcset strings inside an inline script from string literals.
    # CDN-hosted media first, so its paths are resolved before the relative pass.
    cdn_paths = set(CDN_RE.findall(body))
    cdn_full = set(m.group(0) for m in CDN_RE.finditer(body))

    new_images = 0
    for url in sorted(cdn_full):
        if url in mirrored:
            continue
        stripped = re.sub(r"^https?:", "", url)          # drop any scheme
        host_and_path = stripped[2:]                        # then the leading //
        host, _, cdn_path = host_and_path.partition("/")
        req = urllib.request.Request("https://" + host_and_path,
                                     headers={"User-Agent": UA, "Accept": "*/*"})
        try:
            with urllib.request.urlopen(req, timeout=45) as resp:
                data = resp.read()
        except Exception as exc:
            print("     !! %s (%s)" % (host_and_path, exc))
            failed.append(url)
            continue
        local = "assets/_cdn/%s/%s" % (host, cdn_path)
        save(local, data)
        mirrored[url] = local
        new_images += 1

    paths = set(ASSET_RE.findall(body))
    paths |= set(ASSET_RE.findall(css))

    for path in sorted(paths):
        local = mirrored.get(path)
        if not local or not os.path.isfile(os.path.join(HERE, local.replace("/", os.sep))):
            data = fetch(path)
            if data is None:
                continue
            local = "assets" + path
            save(local, data)
            mirrored[path] = local
            new_images += 1
        else:
            mirrored.setdefault(path, local)
    print("   assets: %d referenced (%d via CDN), %d newly mirrored"
          % (len(paths), len(cdn_paths), new_images))

    # ---- js ---------------------------------------------------------------
    script_srcs = re.findall(r'<script[^>]*src="(/_astro/[^"]+)"', body)
    js_map = {}
    for src in script_srcs:
        local = mirrored.get(src)
        if local and os.path.isfile(os.path.join(HERE, local.replace("/", os.sep))):
            js_map[src] = local
            continue
        found = mirror_js([src])
        for k, v in found.items():
            js_map[k] = v
            if k not in mirrored:
                mirrored[k] = v
    print("   js: %d new modules" % len([k for k in js_map if k not in mirrored or True]))

    # ---- rewrite ----------------------------------------------------------
    # One pass over every asset path in the document. The optional ` 192w` style
    # descriptor that follows a srcset entry is preserved verbatim, so the same
    # regex repairs attribute srcsets and JS-built ones alike.
    unwritten = []

    def sub_asset(match):
        path = match.group(0)
        local = mirrored.get(path)
        if not local:
            unwritten.append(path)
            return path
        return prefix + local

    body = CDN_RE.sub(lambda m: (prefix + mirrored[m.group(0)])
                      if m.group(0) in mirrored else m.group(0), body)
    body = ASSET_RE.sub(sub_asset, body)

    # The origin cache-busts with ?v=<hash>. Meaningless against local files, and
    # some static servers are fussy about it, so drop it from resolved paths.
    LOCAL_ASSET = r"%sassets/[A-Za-z0-9._/\-]+\.(?:avif|webp|png|jpe?g|svg|gif|ico|mp4|webm|woff2?)" % re.escape(prefix)
    body = re.sub(LOCAL_ASSET + r"\?v=[A-Za-z0-9._\-]+", lambda m: m.group(0).split("?")[0], body)
    css = re.sub(LOCAL_ASSET + r"\?v=[A-Za-z0-9._\-]+", lambda m: m.group(0).split("?")[0], css)

    # Directory literals: rewrite a quoted directory only when mirrored files
    # actually live under it, so the string concatenation keeps working.
    def sub_dir(match):
        directory = match.group(1)
        if any(m.startswith(directory + "/") for m in mirrored):
            return '"%sassets%s"' % (prefix, directory)
        return match.group(0)

    body = DIR_LITERAL_RE.sub(sub_dir, body)

    for src, local in js_map.items():
        if local:
            body = body.replace('src="%s"' % src, 'src="%s"' % (prefix + local))
        else:
            body = re.sub(r'<script[^>]*src="%s"[^>]*></script>' % re.escape(src), "", body)

    # Only /_astro and /_lazy bundles should still be bare at this point; those are
    # handled above. Anything left is a genuine miss, so report it rather than
    # silently neutralising it into a broken "#".
    leftovers = sorted(set(re.findall(r'"(/(?:_astro|_lazy|images|fonts|icons)/[^"]*)"', body)))
    if leftovers:
        print("   !! unrewritten paths: %s" % ", ".join(leftovers[:5]))

    # ---- relative module imports inside the shared modules ----------------
    for src, local in js_map.items():
        if not local:
            continue
        path = os.path.join(HERE, local.replace("/", os.sep))
        if not os.path.isfile(path):
            continue
        text = open(path, encoding="utf-8").read()
        base = src.rsplit("/", 1)[0]

        def fix(spec, base=base, path=path):
            if not spec.startswith(("./", "../")):
                return spec
            resolved = os.path.normpath(os.path.join(base, spec)).replace(os.sep, "/")
            if not resolved.startswith("/"):
                resolved = "/" + resolved
            target = mirrored.get(resolved)
            if not target:
                return spec
            rel = os.path.relpath(os.path.join(HERE, target.replace("/", os.sep)),
                                  os.path.dirname(path)).replace(os.sep, "/")
            # a bare specifier is read as a package name by bundlers, so keep it relative
            if not rel.startswith("."):
                rel = "./" + rel
            return rel

        text = re.sub(r'(from\s*["\'])([^"\']+)(["\'])',
                      lambda m: m.group(1) + fix(m.group(2)) + m.group(3), text)
        text = re.sub(r'(import\s*\(\s*["\'])([^"\']+)(["\']\s*\))',
                      lambda m: m.group(1) + fix(m.group(2)) + m.group(3), text)
        text = re.sub(r'(import\s*["\'])([^"\']+)(["\'])',
                      lambda m: m.group(1) + fix(m.group(2)) + m.group(3), text)
        open(path, "w", encoding="utf-8").write(text)

    # ---- write ------------------------------------------------------------
    # The page-scoped CSS keys off the body class (home/styles.css mentions
    # .lv3-body 30 times) and the astro scope id, so both opening tags are kept
    # verbatim - rebuilding them as a bare <body> silently drops a third of the
    # per-page styling.
    out_dir = os.path.join(HERE, slug) if slug else HERE
    os.makedirs(out_dir, exist_ok=True)
    title = re.search(r"<title>(.*?)</title>", head, re.S)
    desc = re.search(r'<meta name="description" content="([^"]*)"', head)
    orig_html_tag = re.search(r"<html\b[^>]*>", html)
    orig_body_tag = re.search(r"<body\b[^>]*>", html)
    html_tag = orig_html_tag.group(0) if orig_html_tag else '<html lang="en-US" dir="ltr">'
    body_tag = orig_body_tag.group(0) if orig_body_tag else "<body>"

    out_head = """<!doctype html>
%s
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<meta name="description" content="%s">
<meta name="robots" content="noindex,nofollow">
<link rel="stylesheet" href="styles.css">
<!-- Reverse-engineered static replica of %s%s
     Built for layout and interaction study. All copy, imagery and design remain the
     property of 2 PROJECTS LTDA. Not for republication - see README.md. -->
</head>
%s
""" % (html_tag,
       title.group(1).strip() if title else "2luv",
       desc.group(1) if desc else "",
       ORIGIN, "/en/" + slug if slug else "/en/event/birthday",
       body_tag)

    open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8").write(
        out_head + body.strip() + "\n</body>\n</html>\n")
    open(os.path.join(out_dir, "styles.css"), "w", encoding="utf-8").write(css)
    print("   wrote %s/index.html" % (slug or "."))
    return {"slug": slug, "bytes": len(body)}


# ---- extra shared icons ---------------------------------------------------
for icon in ["/icons/favicon.svg", "/icons/apple-icon-180x180.png", "/favicon.ico"]:
    data = fetch(icon)
    if data:
        save("assets" + icon, data)

results = [r for r in (build_page(*p) for p in PAGES) if r]

with open(os.path.join(HERE, "asset-map.json"), "w", encoding="utf-8") as fh:
    json.dump(mirrored, fh, indent=2, sort_keys=True)

print("\n=== summary ===")
for r in results:
    print("  %-10s %d bytes" % (r["slug"] or "(root)", r["bytes"]))
total = sum(len(f) for _, _, f in os.walk(os.path.join(HERE, "assets")))
print("  assets: %d files" % total)
if failed:
    print("  failed fetches: %d" % len(failed))
    for f in sorted(set(failed)):
        print("    " + f)
