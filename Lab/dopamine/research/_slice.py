import re, ssl, urllib.request
from pathlib import Path

base = Path(r"E:\website-tests\dopamine-clone\research")
html = (base / "raw" / "homepage.html").read_text(encoding="utf-8")

# Extract footer and motion-section blocks via regex on outer tags
def extract_block(html, start_marker, end_markers):
    i = html.lower().find(start_marker.lower())
    if i < 0:
        return None, -1
    # walk back to nearest < 
    start = html.rfind("<", 0, i+1)
    # find end
    lower = html.lower()
    ends = []
    for em in end_markers:
        j = lower.find(em.lower(), i+10)
        if j > 0:
            ends.append(j)
    end = min(ends) if ends else min(len(html), i+50000)
    return html[start:end], start

# motion section
mot, mi = extract_block(html, 'class="motion-section', ['class="footer', 'id="footer', '<footer'])
if mot:
    (base / "raw" / "motion-section.html").write_text(mot, encoding="utf-8")
    print("motion-section len", len(mot), "start", mi)
    print(mot[:2500])
    print("---TAIL---")
    print(mot[-1500:])
else:
    print("NO motion-section")

# footer
fi = html.lower().find('class="footer')
# find better: <footer or class="footer "
for pat in ['<footer', 'class="footer ']:
    j = html.lower().find(pat)
    print("footer candidate", pat, j)

# take from first footer class container - look for <div class="footer
m = re.search(r'<div[^>]*class="[^"]*\bfooter\b[^"]*"', html)
if m:
    start = m.start()
    # crude balanced extract limited
    chunk = html[start:start+80000]
    (base / "raw" / "footer-approx.html").write_text(chunk, encoding="utf-8")
    print("footer approx start", start, "len", len(chunk))
    print(chunk[:3000])
else:
    print("no footer div")

# also search motion-section more carefully
for m in re.finditer(r'class="[^"]*motion-section[^"]*"', html):
    print("motion class at", m.start(), m.group())
for m in re.finditer(r'class="[^"]*\bfooter[^"]*"', html):
    if m.start() > 900000 or True:
        print("footer class at", m.start(), m.group()[:80])
