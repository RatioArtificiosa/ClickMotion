from pathlib import Path
import re
css = Path(r"E:\website-tests\dopamine-clone\research\chunks\main.css").read_text(encoding="utf-8", errors="replace")
# extract :root and html font and h2 and body bits
for pat in [r':root\{[^}]+\}', r'html\{[^}]+\}', r'body\{[^}]+\}', r'\.h2\{[^}]+\}', r'\.input__[^}]+\}', r'@media[^{]+\{[^}]*\.motion-section[^}]*\}']:
    ms = re.findall(pat, css)
    print("PAT", pat, "count", len(ms))
    for m in ms[:5]:
        print(m[:500])
        print("---")

# find all media queries that contain motion-section or footer
media = re.findall(r'@media[^{]+\{(?:[^{}]|\{[^}]*\})*\}', css)
print("media blocks", len(media))
# better approach: find positions of media queries
for m in re.finditer(r'@media\s*\([^)]+\)', css):
    start = m.start()
    # print if nearby has motion or footer within 2000 chars
    chunk = css[start:start+3000]
    if 'motion-section' in chunk or ('.footer' in chunk and 'footer__' in chunk[:500]):
        print("MEDIA", m.group(0))
        # print first 200 of chunk after media
        print(chunk[:400].replace('\n',' ')[:400])
        print("====")
