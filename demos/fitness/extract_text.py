from bs4 import BeautifulSoup
import re

path = r"C:\Users\griga\.gemini\antigravity\brain\f51888e3-b362-46cd-bbf5-660468bb0edd\.system_generated\steps\4274\content.md"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
for script in soup(["script", "style"]):
    script.extract()

text = soup.get_text(separator="\n")
lines = [line.strip() for line in text.splitlines() if line.strip()]
print("\n".join(lines[:120]))
