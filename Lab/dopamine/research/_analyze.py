from pathlib import Path
import re
css = Path(r"E:\website-tests\dopamine-clone\research\chunks\main.css").read_text(encoding="utf-8", errors="replace")
js = Path(r"E:\website-tests\dopamine-clone\research\chunks\main.js").read_text(encoding="utf-8", errors="replace")
vl = Path(r"E:\website-tests\dopamine-clone\research\chunks\video-load.js").read_text(encoding="utf-8", errors="replace")
out = Path(r"E:\website-tests\dopamine-clone\research\raw")

# Extract CSS rules for motion-section and footer
def extract_css_blocks(css, selectors):
    results = []
    # split roughly by } keeping rules
    # find all rules that mention selector substring
    for sel in selectors:
        pattern = re.compile(r'([^{}]*' + re.escape(sel) + r'[^{}]*)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}', re.I)
        # simpler: find selector lines
        for m in re.finditer(r'([^{}]*' + re.escape(sel) + r'[^{}]*)\{([^}]*)\}', css, re.I):
            results.append(m.group(0))
    return results

sels = ["motion-section", "footer", ".container", "text-split", "hover-link", "lazy-video"]
blocks = []
for sel in sels:
    for m in re.finditer(r'([^{}]*' + re.escape(sel) + r'[^{}]*)\{([^}]*)\}', css, re.I):
        blocks.append(m.group(0).strip())
# dedupe preserve order
seen=set(); uniq=[]
for b in blocks:
    if b not in seen:
        seen.add(b); uniq.append(b)
(out/"css-motion-footer.css").write_text("\n\n".join(uniq), encoding="utf-8")
print("css blocks", len(uniq), "chars", sum(len(u) for u in uniq))

# JS search for motion-section and footer
for name, text in [("main.js", js), ("video-load.js", vl)]:
    print("====", name, "len", len(text))
    for key in ["motion-section", "footer", "ScrollTrigger", "gsap", "lenis", "lottie", "pin", "scrub", "scale", "FOOTER", "lazy-video", "text-split", "hover-link"]:
        print(f"  {key}: {text.count(key)}")
    # dump function-ish regions around motion-section
    for key in ["motion-section", "footer__", ".footer", "Footer", "Motion"]:
        idx = text.find(key)
        if idx>=0:
            print(f"  first {key} @ {idx}:", text[max(0,idx-80):idx+200].replace("\n"," ")[:280])

# find gsap/lenis CDN in homepage
html = Path(r"E:\website-tests\dopamine-clone\research\raw\homepage.html").read_text(encoding="utf-8")
for key in ["gsap", "ScrollTrigger", "lenis", "lottie", "cdnjs", "unpkg", "skroll", "swiper", "anime"]:
    print("html", key, html.lower().count(key.lower()))
# script tags inline
for m in re.finditer(r'<script[^>]*>', html):
    tag = m.group(0)
    if 'src' in tag or True:
        if any(x in tag.lower() for x in ['gsap','lenis','lottie','cdn','scroll']):
            print("script tag", tag[:200])
# look for script src without earlier list - module type
srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
print("all srcs", len(srcs))
for s in srcs:
    if any(x in s.lower() for x in ['gsap','lenis','lottie','scroll','three','barba']):
        print(" dep", s)
# preload scripts from link
for m in re.finditer(r'<link[^>]+>', html):
    t=m.group(0)
    if 'script' in t or 'module' in t or any(x in t for x in ['footer-anim','gsap','lottie']):
        print("link", t[:250])
