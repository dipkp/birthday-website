#!/usr/bin/env python
"""
Cut every external dependency, so the replica runs with no third-party requests.

  fonts.googleapis.com  -> local @font-face from the mirrored /fonts/*.woff2
  api.2-luv.com         -> http://127.0.0.1:8788  (local stub service)
  media.2-luv.com       -> /assets/_cdn/media.2-luv.com/...  (already mirrored)
  Azure App Insights    -> removed
  Cloudflare / Google tags -> already stripped; swept again here

Run after a rebuild; idempotent.
"""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
STUB = "http://127.0.0.1:8788"

FONT_FACES = """/* local fonts — no Google Fonts request */
@font-face{font-family:Inter;font-style:normal;font-weight:400 700;font-display:swap;src:url(/fonts/inter-latin.woff2) format("woff2")}
@font-face{font-family:Lora;font-style:normal;font-weight:400 700;font-display:swap;src:url(/fonts/lora-latin.woff2) format("woff2")}
@font-face{font-family:'Cormorant Garamond';font-style:normal;font-weight:400 700;font-display:swap;src:url(/fonts/cormorant-garamond-roman-latin.woff2) format("woff2")}
@font-face{font-family:'Great Vibes';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/great-vibes-roman-latin.woff2) format("woff2")}
@font-face{font-family:'Abril Fatface';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/abril-fatface-latin.woff2) format("woff2")}
@font-face{font-family:'Shadows Into Light';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/shadows-into-light-latin.woff2) format("woff2")}
@font-face{font-family:Zeyada;font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/zeyada-latin.woff2) format("woff2")}
"""

GOOGLE_IMPORT = re.compile(r"@import\s+url\(['\"]?https://fonts\.googleapis\.com/[^)]*\)\s*;?", re.I)
AZURE_TAG = re.compile(
    r'<script\b[^>]*(?:applicationinsights\.azure\.com|livediagnostics\.monitor\.azure\.com)[^>]*>\s*</script>',
    re.I)
MEDIA_ATTR = re.compile(r'((?:src|srcset|poster)=")https?://media\.2-luv\.com/([^"]+)')
MEDIA_ANY = re.compile(r'https?://media\.2-luv\.com/')
# the same URLs also appear inside inline JSON with escaped slashes
MEDIA_ESCAPED = re.compile(r'https?:\\/\\/media\.2-luv\.com\\/')
API_ANY = re.compile(r'https?://api\.2-luv\.com')
# Application Insights ships as a public connection string in the env blob, not a tag
AI_CONN = re.compile(r'("PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING":")([^"]*)(")')
# preconnect / dns-prefetch still open a socket (or a DNS lookup) to a third party
PRECONNECT = re.compile(
    r'<link\b[^>]*rel="(?:preconnect|dns-prefetch)"[^>]*href="https?://(?:[a-z0-9\-]+\.)*(?:2-luv\.com|googleapis\.com|gstatic\.com)[^"]*"[^>]*>',
    re.I)

changed = {"css": 0, "html": 0, "js": 0}
files = 0

for path in glob.glob(os.path.join(HERE, "**", "*"), recursive=True):
    if not os.path.isfile(path):
        continue
    rel = os.path.relpath(path, HERE).replace(os.sep, "/")
    if rel.split("/")[0] in ("_htmlcache", "assets/_astro_orig"):
        continue
    ext = os.path.splitext(path)[1].lower()
    if ext not in (".css", ".html", ".js", ".json"):
        continue
    try:
        text = open(path, encoding="utf-8").read()
    except Exception:
        continue
    orig = text
    files += 1

    if ext == ".css":
        if "fonts.googleapis.com" in text:
            text = GOOGLE_IMPORT.sub(FONT_FACES, text)
            if "fonts.googleapis.com" not in text and "local fonts" not in text:
                text = FONT_FACES + text
    elif ext == ".html":
        text = AZURE_TAG.sub("", text)
        text = AI_CONN.sub(lambda m: m.group(1) + "" + m.group(3), text)
        text = PRECONNECT.sub("", text)
        if "fonts.googleapis.com" in text:
            text = GOOGLE_IMPORT.sub(FONT_FACES, text)
        text = MEDIA_ATTR.sub(lambda m: m.group(1) + "/assets/_cdn/media.2-luv.com/" + m.group(2), text)
        text = MEDIA_ANY.sub("/assets/_cdn/media.2-luv.com/", text)
        text = MEDIA_ESCAPED.sub("/assets/_cdn/media.2-luv.com/", text)
        text = API_ANY.sub(STUB, text)
    else:  # js / json
        text = MEDIA_ANY.sub("/assets/_cdn/media.2-luv.com/", text)
        text = MEDIA_ESCAPED.sub("/assets/_cdn/media.2-luv.com/", text)
        text = API_ANY.sub(STUB, text)

    if text != orig:
        open(path, "w", encoding="utf-8").write(text)
        if ext == ".css":
            changed["css"] += 1
        elif ext == ".html":
            changed["html"] += 1
        else:
            changed["js"] += 1

print("scanned %d files" % files)
print("rewritten: %d css, %d html, %d js/json" % (changed["css"], changed["html"], changed["js"]))

# residual check
left = {"google_fonts": 0, "api": 0, "media": 0, "azure": 0}
for path in glob.glob(os.path.join(HERE, "**", "*"), recursive=True):
    if not os.path.isfile(path):
        continue
    rel = os.path.relpath(path, HERE).replace(os.sep, "/")
    if rel.split("/")[0] == "_htmlcache":
        continue
    if os.path.splitext(path)[1].lower() not in (".css", ".html", ".js", ".json"):
        continue
    t = open(path, encoding="utf-8", errors="replace").read()
    left["google_fonts"] += t.count("fonts.googleapis.com")
    left["api"] += t.count("api.2-luv.com")
    left["media"] += t.count("media.2-luv.com")
    left["azure"] += t.count("applicationinsights")

print("residual:", left)
