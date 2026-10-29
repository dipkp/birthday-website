#!/usr/bin/env python
"""Post-pass: rewrite plain-string lazily-referenced bundle paths inside the
mirrored JS modules so they resolve to the local copies instead of the origin."""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOTS = [os.path.join(HERE, "assets", "_astro"), os.path.join(HERE, "assets", "_lazy")]

# "/_lazy/foo.js"  ->  "../_lazy/foo.js"   (both live under assets/, one level up is wrong only for _lazy itself)
PATTERN = re.compile(r"""(['"])/((?:_lazy|_astro)/[A-Za-z0-9._\-]+\.js)\1""")


def rel_for(module_root, target):
    """Relative path from a module in module_root to a mirrored /_x/file.js."""
    folder = target.split("/")[1]
    name = target.split("/")[-1]
    dest = os.path.join(HERE, "assets", folder, name)
    return os.path.relpath(dest, module_root).replace(os.sep, "/")


patched = 0
for root in ROOTS:
    if not os.path.isdir(root):
        continue
    for name in sorted(os.listdir(root)):
        if not name.endswith(".js"):
            continue
        path = os.path.join(root, name)
        with open(path, encoding="utf-8") as fh:
            text = fh.read()
        original = text
        text = PATTERN.sub(lambda m: m.group(1) + rel_for(root, m.group(2)) + m.group(1), text)
        if text != original:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(text)
            patched += 1
            print("  patched %s/%s" % (os.path.basename(root), name))

print("patched %d module(s)" % patched)
