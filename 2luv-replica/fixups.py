#!/usr/bin/env python
"""Fix-ups: mirror the 1x/2x srcset logo icons, rewrite that srcset, and drop the
one stale JS bundle hash on the blog page (404s upstream - the origin rotated it)."""
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
failed = []


def fetch(path):
    req = urllib.request.Request(ORIGIN + path, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            return resp.read()
    except Exception as exc:
        print("  !! %s (%s)" % (path, exc))
        failed.append(path)
        return None


def save(rel, data):
    dest = os.path.join(HERE, rel.replace("/", os.sep))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as fh:
        fh.write(data)


# ---- 1. the logo pair referenced with 1x / 2x descriptors ------------------
LOGO_SRCSET = "/icons/logo-optimized/logo-small.webp 1x, /icons/logo-optimized/logo-medium.webp 2x"
logo_map = {}
for path in ["/icons/logo-optimized/logo-small.webp", "/icons/logo-optimized/logo-medium.webp"]:
    data = fetch(path)
    if data:
        local = "assets" + path
        save(local, data)
        logo_map[path] = local
        print("  mirrored %s" % path)

# rewrite in every built page
pages = ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
         "blog/index.html", "contact/index.html", "about/index.html"]
for page in pages:
    path = os.path.join(HERE, page.replace("/", os.sep))
    if not os.path.isfile(path):
        continue
    text = open(path, encoding="utf-8").read()
    original = text
    prefix = "../" if "/" in page else ""

    if LOGO_SRCSET in text and len(logo_map) == 2:
        replacement = "%s%s 1x, %s%s 2x" % (
            prefix, logo_map["/icons/logo-optimized/logo-small.webp"],
            prefix, logo_map["/icons/logo-optimized/logo-medium.webp"])
        text = text.replace(LOGO_SRCSET, replacement)

    # ---- 2. drop the stale bundle (only ever a hash rotation, no local twin)
    text = re.sub(
        r'<script[^>]*src="[^"]*BaseLayout\.astro_astro_type_script_index_0_lang\.3kQzEDOb\.js"[^>]*></script>',
        "<!-- BaseLayout bundle omitted: origin rotated this hash and it 404s upstream -->",
        text)

    # ---- 3. report anything still pointing at an origin asset path ----------
    # (never neutralise these into "#": the balloon feature keeps its srcset
    #  strings inside an inline script and rewriting them blindly breaks it)
    leftover = sorted(set(re.findall(r'"(/(?:_astro|_lazy|images|fonts|icons)/[^"]*)"', text)))
    if leftover:
        print("  !! %s still references: %s" % (page, ", ".join(leftover[:4])))

    if text != original:
        open(path, "w", encoding="utf-8").write(text)
        print("  patched %s" % page)

if __name__ == "__main__":
    print("\nfailed: %d" % len(failed))
