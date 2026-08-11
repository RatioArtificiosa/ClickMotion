from pathlib import Path
import re
text = Path(r"E:\website-tests\nothin-clone\research\chunks\main.js").read_text(encoding="utf-8", errors="ignore")

keys = ["formes-w", "papier-form", "chewing-gum", "bonbon-copy", "etoile", "coeur-copy", "loader-img", "formes"]
for key in keys:
    print(f"\ncount {key}:", text.count(key))
    i = text.find(key)
    if i >= 0:
        print(text[max(0,i-400):i+1800])
        print("---")
