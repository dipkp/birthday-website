#!/usr/bin/env python
"""Find every audio asset the site references, and check which are missing locally."""
import glob
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://www.2-luv.com"

AUDIO_EXT = r"(?:mp3|m4a|aac|ogg|oga|wav|flac|opus)"
REF = re.compile(r'["\'`(]((?:https?://[^"\'`)]+)?/[^"\'`)\s]+\.' + AUDIO_EXT + r')["\'`)]', re.I)
AUDIO_TAG = re.compile(r"<audio\b[^>]*>", re.I)

refs = set()
tag_hits = 0
files = glob.glob(os.path.join(HERE, "**", "*.html"), recursive=True) + \
        glob.glob(os.path.join(HERE, "assets", "**", "*.js"), recursive=True) + \
        glob.glob(os.path.join(HERE, "_app", "**", "*.js"), recursive=True)

scanned = 0
for f in files:
    rel = os.path.relpath(f, HERE).replace(os.sep, "/")
    if rel.startswith("_htmlcache/"):
        continue
    try:
        text = open(f, encoding="utf-8", errors="replace").read()
    except Exception:
        continue
    scanned += 1
    if AUDIO_TAG.search(text):
        tag_hits += len(AUDIO_TAG.findall(text))
    for m in REF.findall(text):
        if m.startswith("http") and "2-luv.com" not in m and "media.2-luv.com" not in m:
            continue
        refs.add(m)

print("scanned files:", scanned)
print("<audio> tags found:", tag_hits)
print("audio refs found:", len(refs))

missing = []
for r in sorted(refs):
    p = re.sub(r"^https?://[^/]+", "", r)
    cand = os.path.join(HERE, p.lstrip("/").replace("/", os.sep))
    if not os.path.isfile(cand):
        missing.append(p)

print("missing locally:", len(missing))
for m in missing[:20]:
    print("   " + m)

json_out = os.path.join(HERE, "audio-missing.json")
import json
json.dump(missing, open(json_out, "w", encoding="utf-8"), indent=2)
print("\nwrote", os.path.basename(json_out))
