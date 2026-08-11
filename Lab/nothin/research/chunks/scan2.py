from pathlib import Path
import re
text = Path(r"E:\website-tests\nothin-clone\research\chunks\main.js").read_text(encoding="utf-8", errors="ignore")

# Find [letter] handling
for key in ["[letter]", "letter-child", "parallax-img", "hoverme"]:
    idx = 0
    n = 0
    while n < 3:
        i = text.find(key, idx)
        if i < 0: break
        print(f"\n===== {key} @ {i} =====")
        print(text[max(0,i-200):i+1200])
        idx = i + len(key)
        n += 1
