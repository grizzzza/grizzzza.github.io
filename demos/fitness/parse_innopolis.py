import re

path = r"C:\Users\griga\.gemini\antigravity\brain\f51888e3-b362-46cd-bbf5-660468bb0edd\.system_generated\steps\4274\content.md"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

print("Length of raw HTML:", len(text))

# Find headings, images, links, blocks
imgs = re.findall(r'https?://[^\s\'"]+\.(?:jpg|png|svg)', text)
print(f"Found {len(imgs)} image URLs")
for img in set(imgs[:15]):
    print("  Image:", img)

# Find visible text blocks in Tilda html
titles = re.findall(r'field=["\'](?:title|headline|descr|text)["\'][^>]*>(.*?)</div>', text, re.DOTALL)
print(f"Found {len(titles)} Tilda fields:")
for t in titles[:20]:
    clean_t = re.sub(r'<[^>]+>', '', t).strip()
    if clean_t:
        print("  -", clean_t)
