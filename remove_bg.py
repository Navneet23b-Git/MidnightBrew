import os
from rembg import remove
from PIL import Image

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

images = ["matcha.png", "strawberry.png", "caramel.png", "choco.png"]
base_dir = "public/hero"

for img in images:
    input_path = os.path.join(base_dir, img)
    output_path = os.path.join(base_dir, img)
    process_image(input_path, output_path)
