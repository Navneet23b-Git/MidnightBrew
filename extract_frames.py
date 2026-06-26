import cv2
import os

video_path = r"C:\Users\ASUS\.gemini\antigravity\scratch\cafe-website-4\midnight\Glass_coffee_cup_lands_on_202606250846.mp4"
output_dir = r"C:\Users\ASUS\.gemini\antigravity\scratch\cafe-website-4\public\midnight-frames"

os.makedirs(output_dir, exist_ok=True)

# Clear existing frames if any
for f in os.listdir(output_dir):
    os.remove(os.path.join(output_dir, f))

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error: Could not open video file.")
    exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)

print(f"Total frames: {total_frames}, FPS: {fps}")

# Limit to ~400 frames maximum
skip_frames = max(1, total_frames // 400)

frame_idx = 0
saved_count = 0

print("Extracting frames...")
while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    if frame_idx % skip_frames == 0:
        # Resize frame to max 1920x1080 to keep sizes manageable
        h, w = frame.shape[:2]
        if w > 1920:
            scale = 1920 / w
            frame = cv2.resize(frame, (1920, int(h * scale)))

        filename = os.path.join(output_dir, f"{saved_count:04d}.webp")
        success = cv2.imwrite(filename, frame, [cv2.IMWRITE_WEBP_QUALITY, 80])
        if not success:
            filename = os.path.join(output_dir, f"{saved_count:04d}.jpg")
            cv2.imwrite(filename, frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
        
        saved_count += 1
        
    frame_idx += 1

cap.release()
print(f"Extraction complete! Saved {saved_count} frames to {output_dir}")
