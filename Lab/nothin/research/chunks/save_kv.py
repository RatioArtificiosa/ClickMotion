from pathlib import Path
text = Path(r"E:\website-tests\nothin-clone\research\chunks\main.js").read_text(encoding="utf-8", errors="ignore")
# save clean beautified extract of Kv function
i = text.find("function Kv()")
j = text.find("function tC()", i)
Path(r"E:\website-tests\nothin-clone\research\chunks\formes-kv-original.js").write_text(text[i:j], encoding="utf-8")
print("saved", j-i, "chars")
print(text[i:j][:2500])
