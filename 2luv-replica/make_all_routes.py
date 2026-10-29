#!/usr/bin/env python
"""Build the complete route list from every sitemap, all locales."""
import json
import os
import re
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
INDEX = "https://www.2-luv.com/sitemap.xml"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf-8", "replace")


def locs(xml):
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)


children = locs(get(INDEX))
urls = set()
for c in children:
    try:
        urls |= set(locs(get(c)))
    except Exception as exc:
        print("  !! %s (%s)" % (c, exc))

urls = {u.split("#")[0].split("?")[0] for u in urls}
print("total sitemap urls: %d" % len(urls))

# group by locale
by_lang = {}
for u in urls:
    m = re.match(r"https://www\.2-luv\.com/([a-z]{2}(?:-[a-z]{2})?)(/|$)", u)
    lang = m.group(1) if m else "(other)"
    by_lang.setdefault(lang, []).append(u)

print("\nby locale:")
for lang, items in sorted(by_lang.items(), key=lambda kv: -len(kv[1])):
    print("  %-8s %4d" % (lang, len(items)))

out = os.path.join(HERE, "routes_all.json")
json.dump(sorted(urls), open(out, "w", encoding="utf-8"), indent=2)
print("\nwrote routes_all.json (%d urls)" % len(urls))
