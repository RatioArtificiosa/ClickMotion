import urllib.request, re, ssl, json, os
from pathlib import Path

out = Path(r"E:\website-tests\dopamine-clone\research")
ctx = ssl.create_default_context()
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"}

def fetch(url, binary=False):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=90) as r:
        data = r.read()
        return data if binary else data.decode("utf-8", errors="replace")

html = fetch("https://serotoninn.com/")
(out / "raw" / "homepage.html").write_text(html, encoding="utf-8")
print("HTML", len(html))

# scripts / styles
scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html, re.I)
links = re.findall(r'<link[^>]+href=["\']([^"\']+)["\']', html, re.I)
print("scripts", len(scripts))
for s in scripts:
    print("  S", s)
print("links", len(links))
for s in links:
    print("  L", s)

# mp4 / webp / video related
media = set(re.findall(r'https?://[^"\'\s>]+\.(?:mp4|webm|webp|svg|woff2?)(?:\?[^"\'\s>]*)?', html, re.I))
media |= set(re.findall(r'/wp-content/[^"\'\s>]+\.(?:mp4|webm|webp|svg|woff2?)(?:\?[^"\'\s>]*)?', html, re.I))
media |= set(re.findall(r'/wp-content/themes/[^"\'\s>]+', html, re.I))
print("media sample", len(media))
for m in sorted(media)[:80]:
    print("  M", m)

# footer / film slices
for key in ["footer", "film", "serotoninn film", "footer_bg", "VIDEO_2", "motion_poster", "section-video", "film-motion"]:
    i = html.lower().find(key.lower())
    print(f"idx {key!r} -> {i}")

# dump all class names containing footer or film or video
classes = set(re.findall(r'class=["\']([^"\']+)["\']', html))
interesting = [c for c in classes if re.search(r'footer|film|video|motion|newsletter|credit', c, re.I)]
print("interesting classes", len(interesting))
for c in sorted(interesting)[:100]:
    print("  C", c)

# save media list
(out / "raw" / "media-urls.txt").write_text("\n".join(sorted(media)), encoding="utf-8")
(out / "raw" / "scripts.txt").write_text("\n".join(scripts), encoding="utf-8")
(out / "raw" / "links.txt").write_text("\n".join(links), encoding="utf-8")
