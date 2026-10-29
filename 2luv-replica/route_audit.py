#!/usr/bin/env python
"""Enumerate every route the origin declares, and diff against the mirrored pages."""
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
    with urllib.request.urlopen(req, timeout=40) as resp:
        return resp.read().decode("utf-8", "replace")


def locs(xml):
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)


root = get(INDEX)
children = locs(root)
print("sitemap children:", len(children))

all_urls = set()
for child in children:
    try:
        xml = get(child)
    except Exception as exc:
        print("  !! %s (%s)" % (child, exc))
        continue
    found = locs(xml)
    all_urls |= set(found)
    print("  %-52s %d urls" % (child.rsplit("/", 1)[-1], len(found)))

en = sorted(u for u in all_urls if re.search(r"2-luv\.com/en(/|$)", u))
print("\ntotal urls: %d   english: %d" % (len(all_urls), len(en)))

# group by first path segment
groups = {}
for u in en:
    path = re.sub(r"^https://www\.2-luv\.com", "", u)
    parts = [p for p in path.split("/") if p]
    seg = parts[1] if len(parts) > 1 else "(root)"
    groups.setdefault(seg, []).append(path)

print("\nenglish routes by section:")
for seg, items in sorted(groups.items(), key=lambda kv: -len(kv[1])):
    print("  %-14s %3d   e.g. %s" % (seg, len(items), items[0][:60]))

with open(os.path.join(HERE, "routes_en.json"), "w", encoding="utf-8") as fh:
    json.dump(en, fh, indent=2)
print("\nwrote routes_en.json")

# what is mirrored locally
local = []
for dirpath, _d, files in os.walk(HERE):
    if os.path.basename(dirpath) in ("assets", "_app", "fonts", "images", "_bundle", "_lazy", "_astro", "nodes", "chunks", "immutable"):
        continue
    if "index.html" in files:
        rel = os.path.relpath(dirpath, HERE).replace(os.sep, "/")
        local.append("/" if rel == "." else "/" + rel + "/")
print("\nmirrored page folders: %d" % len(local))
for p in sorted(local):
    print("  " + p)
