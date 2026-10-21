import os
from PIL import Image

MAX_WIDTH = 1440
WEBP_QUALITY = 80

folders = [
    os.path.abspath('Frontend/public/assets'),
    os.path.abspath('Frontend/src/assets')
]

total_original = 0
total_webp = 0

print("Starting image optimization...")

for folder in folders:
    if not os.path.exists(folder):
        continue
    for root, dirs, files in os.walk(folder):
        for f in files:
            if not f.lower().endswith(('.png', '.jpg', '.jpeg')):
                continue
            filepath = os.path.join(root, f)
            orig_size = os.path.getsize(filepath)
            total_original += orig_size

            try:
                with Image.open(filepath) as img:
                    # Convert RGBA or RGB
                    has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
                    
                    # Resize if wider than MAX_WIDTH while keeping aspect ratio
                    w, h = img.size
                    if w > MAX_WIDTH:
                        new_h = int(h * (MAX_WIDTH / w))
                        resized = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
                    else:
                        resized = img.copy()

                    # Save WebP version
                    webp_path = os.path.splitext(filepath)[0] + '.webp'
                    resized.save(webp_path, 'WEBP', quality=WEBP_QUALITY, method=4)
                    webp_size = os.path.getsize(webp_path)
                    total_webp += webp_size

                    # Also re-save original format compressed
                    if f.lower().endswith('.png'):
                        resized.save(filepath, 'PNG', optimize=True)
                    elif f.lower().endswith(('.jpg', '.jpeg')):
                        if resized.mode != 'RGB':
                            resized = resized.convert('RGB')
                        resized.save(filepath, 'JPEG', quality=82, optimize=True)

                    new_orig_size = os.path.getsize(filepath)
                    print(f"Compressed {f}: {orig_size/1024:.1f}KB -> WebP: {webp_size/1024:.1f}KB, Optimized: {new_orig_size/1024:.1f}KB")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

print(f"\nOptimization complete!")
print(f"Total Original: {total_original / (1024*1024):.2f} MB")
print(f"Total WebP:     {total_webp / (1024*1024):.2f} MB")
reduction = (1 - (total_webp / total_original)) * 100 if total_original > 0 else 0
print(f"Bandwidth Saved with WebP: {reduction:.1f}%")
