#!/usr/bin/env python
"""
Reference-closure check.

Starts from every page and follows the whole local reference graph the way a
browser would: HTML attributes and srcsets, then url() inside CSS, then
import/from/import() inside JS - recursively. Anything that does not resolve on
disk is a request that would 404 at runtime.

This is stricter than verify_all.py, which only looks at assets/ paths in the HTML.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))

PAGES = ["index.html", "home/index.html", "pricing/index.html", "create/index.html",
         "blog/index.html", "contact/index.html", "about/index.html", "features/index.html"]

HTML_ATTR = re.compile(r'(?:src|href|poster)="([^"]+)"')
SRCSET = re.compile(r'srcset="([^"]+)"')
CSS_URL = re.compile(r"url\(([^)]+)\)")
JS_SPEC = re.compile(r'(?:\bfrom\s*|\bimport\s*\(?\s*)["\']([^"\']+)["\']')
JS_BARE_IMPORT = re.compile(r'\bimport\s*["\']([^"\']+)["\']')

problems = []
visited = set()
stats = {"html": 0, "css": 0, "js": 0}


def norm(path):
    return os.path.normpath(path)


def resolve(ref, base_dir):
    """Resolve to a filesystem path, or None if it is not a local reference."""
    ref = ref.strip().strip("'\"").split("#")[0]
    if not ref or ref.startswith(("data:", "mailto:", "tel:", "javascript:", "//")):
        return None
    if ref.startswith("http"):
        return None
    ref = ref.split("?")[0]
    if ref.startswith("/"):
        return norm(os.path.join(HERE, ref.lstrip("/").replace("/", os.sep)))
    return norm(os.path.join(base_dir, ref.replace("/", os.sep)))


def walk_file(path, origin_page):
    real = norm(path)
    if real in visited:
        return
    visited.add(real)

    if not os.path.isfile(real):
        problems.append("%s -> missing %s" % (origin_page, os.path.relpath(real, HERE)))
        return

    ext = os.path.splitext(real)[1].lower()
    base_dir = os.path.dirname(real)

    if ext in (".html",):
        stats["html"] += 1
        text = open(real, encoding="utf-8", errors="replace").read()
        # Only real markup matters. Inline JSON/config blocks contain strings that
        # look like attributes ("tableSources":{"landscape":...}) and produced
        # phantom references like home/landscape.
        text = re.sub(r"<script\b[^>]*>.*?</script>", "", text, flags=re.S | re.I)
        text = re.sub(r"<style\b[^>]*>.*?</style>", "", text, flags=re.S | re.I)
        refs = set(HTML_ATTR.findall(text))
        for group in SRCSET.findall(text):
            for part in group.split(","):
                part = part.strip().split(" ")[0]
                if part:
                    refs.add(part)
        for ref in refs:
            target = resolve(ref, base_dir)
            if target:
                walk_file(target, origin_page)

    elif ext == ".css":
        stats["css"] += 1
        text = open(real, encoding="utf-8", errors="replace").read()
        for ref in set(CSS_URL.findall(text)):
            target = resolve(ref, base_dir)
            if target:
                walk_file(target, origin_page)

    elif ext == ".js":
        stats["js"] += 1
        text = open(real, encoding="utf-8", errors="replace").read()
        specs = set(JS_SPEC.findall(text)) | set(JS_BARE_IMPORT.findall(text))
        for spec in specs:
            if spec.startswith(("/", "./", "../")):
                target = resolve(spec, base_dir)
                if target:
                    walk_file(target, origin_page)
            elif re.match(r"^[A-Za-z0-9._\-]+\.(js|css)$", spec):
                target = norm(os.path.join(base_dir, spec))
                walk_file(target, origin_page)


for page in PAGES:
    start = os.path.join(HERE, page.replace("/", os.sep))
    if not os.path.isfile(start):
        problems.append("missing page %s" % page)
        continue
    walk_file(start, page)

print("closure: %d html, %d css, %d js files, %d total"
      % (stats["html"], stats["css"], stats["js"], len(visited)))

if problems:
    uniq = sorted(set(problems))
    print("\nBROKEN (%d unique):" % len(uniq))
    for p in uniq[:40]:
        print("  " + p)
    sys.exit(1)
print("OK - every reference in the graph resolves")
