from pathlib import Path
js = Path(r"E:\website-tests\dopamine-clone\research\chunks\main.js").read_text(encoding="utf-8")
# find Ge function
idx = js.find("function Ge()")
print("Ge at", idx)
print(js[idx:idx+4500])
Path(r"E:\website-tests\dopamine-clone\research\raw\motion-section-from-main.js").write_text(js[idx:idx+5000], encoding="utf-8")
# also search for imports at start
print("---HEAD---")
print(js[:800])
# lenis setup
for key in ["Lenis", "lenis", "ScrollTrigger", "registerPlugin"]:
    i = js.find(key)
    print(key, i, js[i:i+120] if i>=0 else "")
