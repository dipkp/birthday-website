#!/usr/bin/env python
"""Add each locale's root page (/pt, /fr, ...) which the sitemap omits."""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"
LANGS = ["en", "pt", "fr", "es", "de", "zh", "zh-tw", "ja", "ko", "ms", "ar", "ru"]

path = os.path.join(HERE, "routes_all.json")
urls = set(json.load(open(path, encoding="utf-8")))
before = len(urls)

for lang in LANGS:
    urls.add("%s/%s" % (ORIGIN, lang))

json.dump(sorted(urls), open(path, "w", encoding="utf-8"), indent=2)
print("routes_all.json: %d -> %d (added %d locale roots)" % (before, len(urls), len(urls) - before))
