#!/usr/bin/env python
"""Make a scratch copy of the home page with the hero copy lifted above the shade,
to test whether the shade is painting over it."""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(HERE, "home", "index.html")
html = open(src, encoding="utf-8").read()

probe = """<style id="probe">
/* scratch experiment: is the hero copy painted under the .lv3-hero-shade? */
.lv3-hero-inner{position:relative;z-index:3!important}
.lv3-hero-shade{background:rgba(255,0,0,.12)!important}
</style>
</head>"""
html = html.replace("</head>", probe, 1)
open(os.path.join(HERE, "home", "_probe.html"), "w", encoding="utf-8").write(html)
print("wrote home/_probe.html")
