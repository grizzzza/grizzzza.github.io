import os
import urllib.request

ASSETS_DIR = r"d:/NOT A DUMP/antigravity/portfolio/demos/store/assets"

# 16 distinct product image URLs (Unsplash high quality direct photos)
PRODUCT_IMAGES = {
    "product-1.jpg": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",  # Sofa photo
    "product-2.jpg": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80",  # Wooden Dining Table photo
    "product-3.jpg": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80",  # Armchair photo
    "product-4.jpg": "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&auto=format&fit=crop&q=80",  # Wall Shelf photo
    "product-5.jpg": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80",  # Chandelier/Pendant Lamp photo
    "product-6.jpg": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",  # Floor Lamp photo
    "product-7.jpg": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80",  # Wall Sconce photo
    "product-8.jpg": "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800&auto=format&fit=crop&q=80",  # Table Lamp photo
    "product-9.jpg": "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=80",  # Chair photo
    "product-10.jpg": "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&auto=format&fit=crop&q=80", # Desk Lamp photo
    "product-11.jpg": "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=800&auto=format&fit=crop&q=80", # Decor Shelf photo
    "product-12.jpg": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80", # Coffee Table photo
    "product-13.jpg": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80", # Pouf/Ottoman photo
    "product-14.jpg": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=80", # Wall Clock photo
    "product-15.jpg": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80", # Framed Wall Art photo
    "product-16.jpg": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80", # Woven Plaid/Blanket photo (MUST BE A PLAID/BLANKET!)
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

os.makedirs(ASSETS_DIR, exist_ok=True)

all_successful = True
print("Starting download/update of product images...")
for filename, url in PRODUCT_IMAGES.items():
    filepath = os.path.join(ASSETS_DIR, filename)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(filepath, "wb") as f:
            data = resp.read()
            f.write(data)
        size_kb = os.path.getsize(filepath) / 1024
        is_valid = size_kb > 15
        print(f"Downloaded {filename}: {size_kb:.2f} KB (Valid > 15KB: {is_valid})")
        if not is_valid:
            all_successful = False
    except Exception as e:
        print(f"Failed to download {filename} from {url}: {e}")
        all_successful = False

if all_successful:
    print("ALL 16 PRODUCT IMAGES DOWNLOADED SUCCESSFULLY AND EXCEED 15KB!")
else:
    print("Some images failed or were under 15KB.")
