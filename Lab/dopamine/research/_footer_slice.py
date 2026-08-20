import re, ssl, urllib.request
from pathlib import Path

base = Path(r"E:\website-tests\dopamine-clone\research")
html = (base / "raw" / "homepage.html").read_text(encoding="utf-8")

# footer is <footer class="footer"> ... </footer>
m = re.search(r'<footer\b[^>]*class="footer"[^>]*>', html)
if not m:
    m = re.search(r'<footer\b', html)
print("footer open", m.start() if m else None, m.group() if m else None)
start = m.start()
# find matching close - naive from start
end = html.find('</footer>', start)
print("footer close", end)
footer = html[start:end+len('</footer>')]
(base / "raw" / "footer.html").write_text(footer, encoding="utf-8")
print("footer len", len(footer))
print(footer[:4000])
print("---MID---")
print(footer[4000:8000])
print("---END---")
print(footer[-2500:])

# also keep clean motion section
mot = re.search(r'<section class="motion-section">.*?</section>', html, re.S)
if mot:
    (base / "raw" / "motion-section.html").write_text(mot.group(0), encoding="utf-8")
    print("motion clean len", len(mot.group(0)))
