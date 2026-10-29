#!/usr/bin/env python
"""Diagnose why the replica may not behave when opened straight from disk."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()

print("=== script tags ===")
for m in re.finditer(r"<script([^>]*)>", html):
    attrs = m.group(1).strip()
    src = re.search(r'src="([^"]+)"', attrs)
    kind = "MODULE" if "module" in attrs else "classic"
    print("  %-8s %s" % (kind, src.group(1) if src else "(inline)"))

modules = len(re.findall(r'<script[^>]*type="module"[^>]*src=', html))
print("\nmodule scripts with src: %d  <-- these are blocked under file://" % modules)

print("\n=== reveal hooks ===")
print("  class js-reveal on .lv3 :", "js-reveal" in html)
print("  data-lv3-reveal count   :", len(re.findall(r"data-lv3-reveal", html)))
# css that hides reveal targets until js adds a class
css = open(os.path.join(HERE, "styles.css"), encoding="utf-8").read()
m = re.search(r"\.lv3\.js-reveal \[data-lv3-reveal\]\{[^}]*\}", css)
print("  hide rule               :", (m.group(0)[:120] + "...") if m else "none")

print("\n=== pricing ===")
m = re.search(r'<div[^>]*data-lv3-price-wrap[^>]*>', html)
print("  wrap tag   :", m.group(0) if m else "not found")
m2 = re.search(r'data-lv3-price-state="([^"]*)"', html)
print("  initial state:", m2.group(1) if m2 else "?")
m3 = re.search(r'data-lv3-pricing-endpoint="([^"]*)"', html)
print("  endpoint   :", m3.group(1) if m3 else "?")
m4 = re.search(r'<div[^>]*data-lv3-price[^>]*>(.*?)</div>', html, re.S)
print("  price node :", (m4.group(0)[:220] if m4 else "not found"))
for state in ["loading", "error", "missing"]:
    rule = re.search(r"\[data-lv3-price-wrap\]\[data-lv3-price-state=%s\][^}]*\}" % state, css)
    print("  css[%s]:" % state, rule.group(0) if rule else "-")

print("\n=== internal links to the origin ===")
abs_links = re.findall(r'href="https://www\.2-luv\.com(/[^"]*)"', html)
uniq = sorted(set(abs_links))
print("  total: %d, unique: %d" % (len(abs_links), len(uniq)))
for u in uniq[:30]:
    print("   ", u)

print("\n=== local pages available ===")
for slug in ["", "home", "pricing", "create", "blog", "contact", "about", "features"]:
    p = os.path.join(HERE, slug, "index.html") if slug else os.path.join(HERE, "index.html")
    print("  %-10s %s" % (slug or "(root)", "ok" if os.path.isfile(p) else "MISSING"))
