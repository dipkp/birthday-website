#!/usr/bin/env python
"""Why are tiny inline SVGs rendering at 1200px?"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
css = open(os.path.join(HERE, "home", "styles.css"), encoding="utf-8").read()
html = open(os.path.join(HERE, "home", "index.html"), encoding="utf-8").read()

print("css mentions .lv3-season-arrow :", css.count("lv3-season-arrow"))
print("html mentions data-astro-cid-opsataos :", html.count("data-astro-cid-opsataos"))
print("css mentions data-astro-cid-opsataos   :", css.count("data-astro-cid-opsataos"))

for m in re.finditer(r"[^{}]*lv3-season-arrow[^{}]*\{", css):
    start = css.rfind("}", 0, m.start()) + 1
    print("  RULE: " + css[start:m.end()].replace("\n", " ")[:220])

print("\n=== any bare svg sizing rule? ===")
for m in re.finditer(r"[^{}]{0,80}\bsvg\b[^{}]{0,80}\{[^}]{0,160}\}", css):
    txt = m.group(0).replace("\n", " ")
    if "width" in txt or "height" in txt:
        print("  " + txt[:200])

print("\n=== count of <style> blocks in the captured source ===")
src = open(os.path.join(HERE, "..", "2luv_home.html"), encoding="utf-8").read()
print("  source:", len(re.findall(r"<style", src)), " built:", len(re.findall(r"<style", html)))
print("  source css bytes:", sum(len(s) for s in re.findall(r"<style[^>]*>(.*?)</style>", src, re.S)))
