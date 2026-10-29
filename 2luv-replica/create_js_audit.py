#!/usr/bin/env python
"""Does the create page have a SvelteKit client entry we dropped?"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "2luv_create.html"), encoding="utf-8").read()

print("inline <script> blocks:", len(re.findall(r"<script(?![^>]*src=)[^>]*>", src)))
print("type=module inline    :", len(re.findall(r'<script[^>]*type="module"(?![^>]*src=)', src)))
print("modulepreload links   :", len(re.findall(r'rel="modulepreload"', src)))
print("_app/immutable/entry  :", len(re.findall(r"_app/immutable/entry", src)))
print("_app/immutable/nodes  :", len(re.findall(r"_app/immutable/nodes", src)))
print("total _app refs       :", len(re.findall(r"/_app/", src)))

# what does the head preload for JS?
for m in re.finditer(r'<link[^>]*rel="modulepreload"[^>]*>', src):
    print("  preload:", m.group(0)[:150])

# any inline bootstrap referencing the app
for m in re.finditer(r"<script(?![^>]*src=)[^>]*>", src):
    start = m.start()
    chunk = src[start:start + 200]
    print("  inline head:", chunk[:160].replace("\n", " "))
