#!/usr/bin/env python
"""Verify the replica: every local reference resolves, CSS braces balance,
and every mirrored JS module parses."""
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
problems = []
checked = 0

html = open(os.path.join(HERE, "index.html"), encoding="utf-8").read()
css = open(os.path.join(HERE, "styles.css"), encoding="utf-8").read()

# ---- 1. local references in the HTML -------------------------------------
refs = set()
for m in re.finditer(r'(?:src|href|poster)="([^"]+)"', html):
    refs.add(m.group(1))
for m in re.finditer(r'srcset="([^"]+)"', html):
    for part in m.group(1).split(","):
        part = part.strip().split(" ")[0]
        if part:
            refs.add(part)

for ref in sorted(refs):
    if not ref or ref.startswith(("#", "http", "mailto:", "tel:", "data:")):
        continue
    if not ref.startswith("assets/"):
        continue  # styles.css handled below
    checked += 1
    if not os.path.isfile(os.path.join(HERE, ref.replace("/", os.sep))):
        problems.append("missing file (html): %s" % ref)

# ---- 2. url() references in the CSS --------------------------------------
for m in re.finditer(r"url\(([^)]+)\)", css):
    raw = m.group(1).strip().strip('"\'')
    if raw.startswith(("http", "data:")):
        continue
    checked += 1
    target = raw.lstrip("/")
    if not os.path.isfile(os.path.join(HERE, target.replace("/", os.sep))):
        problems.append("missing file (css): %s" % raw)

# ---- 3. CSS structural sanity --------------------------------------------
if css.count("{") != css.count("}"):
    problems.append("css brace mismatch: %d { vs %d }" % (css.count("{"), css.count("}")))
for bad in ["@font-face{font-family:Cormorant", "src:url(/fonts/"]:
    if bad in css:
        problems.append("css still references origin font path: %s" % bad)

# ---- 4. JS syntax check via node -----------------------------------------
node_modules = []
for root, _dirs, files in os.walk(os.path.join(HERE, "assets")):
    for name in files:
        if name.endswith(".js"):
            node_modules.append(os.path.join(root, name))
print("js modules to parse: %d" % len(node_modules))
for path in sorted(node_modules):
    rel = os.path.relpath(path, HERE)
    result = subprocess.run(
        ["node", "--input-type=module", "--check"],
        input=open(path, encoding="utf-8").read(),
        capture_output=True, text=True, shell=False,
    )
    checked += 1
    if result.returncode != 0:
        err = (result.stderr or "").strip().splitlines()
        problems.append("js parse error %s: %s" % (rel, err[0] if err else "?"))

# ---- 5. no leftover origin asset paths -----------------------------------
for leftover in re.findall(r'(?:src|href)="(/(?:_astro|_lazy|images|fonts)/[^"]*)"', html):
    problems.append("unrewritten origin path: %s" % leftover)

# ---- report --------------------------------------------------------------
print("references checked: %d" % checked)
if problems:
    print("\nFAILED (%d):" % len(problems))
    for p in problems:
        print("  " + p)
    sys.exit(1)
print("\nOK - all local references resolve, css balanced, js parses")
