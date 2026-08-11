from pathlib import Path
import re
text = Path(r"E:\website-tests\nothin-clone\research\chunks\main.js").read_text(encoding="utf-8", errors="ignore")

sels = re.findall(r'querySelector(?:All)?\((["\'])(.*?)\1\)', text)
uniq = sorted(set(s[1] for s in sels))
print("ALL SELECTORS", len(uniq))
for u in uniq:
    if re.search(r"float|object|item|blob|media|img|hero|void|magnet|mouse|hover|parallax|scatter|particle|dragg|inert|foil|aster|papier|canvas|webgl|three|scene|letter|debris|cut", u, re.I):
        print(" ", u)

print("\n--- class strings ---")
classes = re.findall(r'["\']([a-zA-Z0-9_-]*(?:float|object|mouse|hover|magnet|scatter|inert|debris|cutout|foil|blob|void|phobic)[a-zA-Z0-9_-]*)["\']', text, re.I)
for c in sorted(set(classes)):
    print(" ", c)

print("\n--- data attrs ---")
datas = re.findall(r'\[data-[^\]]+\]', text)
for d in sorted(set(datas))[:50]:
    print(" ", d)
