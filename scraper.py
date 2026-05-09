import requests
from bs4 import BeautifulSoup
import json

url = "https://www.animefillerlist.com/shows/one-piece"
headers = {"User-Agent": "Mozilla/5.0"}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

episodes = []

rows = soup.select("table tbody tr")

def get_arc(num):
    if 1 <= num <= 61:
        return "East Blue"
    elif 62 <= num <= 135:
        return "Alabasta"
    elif 136 <= num <= 206:
        return "Sky Island"
    elif 207 <= num <= 325:
        return "Water 7"
    elif 326 <= num <= 384:
        return "Thriller Bark"
    elif 385 <= num <= 516:
        return "Marineford"
    elif 517 <= num <= 746:
        return "Dressrosa"
    elif 747 <= num <= 889:
        return "Whole Cake Island"
    elif 890 <= num <= 1085:
        return "Wano"
    else:
        return "Final Saga"

for row in rows:
    cells = row.find_all("td")

    if len(cells) < 2:
        continue

    try:
        number = int(cells[0].text.strip())
    except:
        continue

    title = cells[1].text.strip()
    row_class = " ".join(row.get("class", []))

    if "filler" in row_class:
        ep_type = "Filler"
    elif "mixed" in row_class:
        ep_type = "Mixed Canon/Filler"
    else:
        ep_type = "Canon"

    episodes.append({
        "number": number,
        "title": title,
        "type": ep_type,
        "arc": get_arc(number)
    })

with open("episodes.json", "w", encoding="utf-8") as f:
    json.dump(episodes, f, indent=2)

print("Done! Episodes saved.")
