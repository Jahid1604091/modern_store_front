import React, { useEffect } from "react";

const CONFIDENCE_THRESHOLD = 0.3;
const JERSEY_WIDTH_TO_SHOULDER_RATIO = 2.3; // assumed ratio of jersey artwork width to its own shoulder span
const VERTICAL_OFFSET_RATIO = 0.15; // nudge the jersey up slightly above the literal shoulder line
const MAX_CANVAS_WIDTH = 1024;

export function computeOverlayTransform(keypoints) {
  const byName = Object.fromEntries((keypoints || []).map((k) => [k.name, k]));
  const left = byName.left_shoulder;
  const right = byName.right_shoulder;

  if (!left || !right || left.score < CONFIDENCE_THRESHOLD || right.score < CONFIDENCE_THRESHOLD) {
    return null;
  }

  // MoveNet's "left"/"right" are the subject's anatomical sides, which in a
  // normal (non-mirrored) frontal photo are swapped on-screen — the subject's
  // left shoulder appears on the image's right side. Reorder by actual x
  // position so the vector points screen-left -> screen-right; using the
  // anatomical labels directly made the angle come out ~180deg off, flipping
  // the jersey upside-down.
  const [screenLeft, screenRight] = left.x <= right.x ? [left, right] : [right, left];
  const dx = screenRight.x - screenLeft.x;
  const dy = screenRight.y - screenLeft.y;
  const shoulderDist = Math.hypot(dx, dy);

  return {
    anchorX: (left.x + right.x) / 2,
    anchorY: (left.y + right.y) / 2 - shoulderDist * VERTICAL_OFFSET_RATIO,
    angle: Math.atan2(dy, dx),
    shoulderDist,
  };
}

// Draws the uploaded photo plus the jersey overlay onto a canvas using plain
// 2D compositing (translate/rotate/scale) — no AI image generation involved.
const TryonCanvas = ({ canvasRef, photoImage, jerseyImage, keypoints, onResult }) => {
  useEffect(() => {
    if (!photoImage || !jerseyImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scale = Math.min(1, MAX_CANVAS_WIDTH / photoImage.naturalWidth);
    canvas.width = photoImage.naturalWidth * scale;
    canvas.height = photoImage.naturalHeight * scale;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(photoImage, 0, 0, canvas.width, canvas.height);

    const transform = computeOverlayTransform(keypoints);
    if (!transform) {
      onResult?.({ ok: false, reason: "low_confidence" });
      return;
    }

    const { anchorX, anchorY, angle, shoulderDist } = transform;
    const desiredWidth = shoulderDist * scale * JERSEY_WIDTH_TO_SHOULDER_RATIO;
    const desiredHeight = (jerseyImage.naturalHeight / jerseyImage.naturalWidth) * desiredWidth;

    ctx.save();
    ctx.translate(anchorX * scale, anchorY * scale);
    ctx.rotate(angle);
    ctx.drawImage(jerseyImage, -desiredWidth / 2, 0, desiredWidth, desiredHeight);
    ctx.restore();

    onResult?.({ ok: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoImage, jerseyImage, keypoints]);

  return <canvas ref={canvasRef} style={{ maxWidth: "100%", borderRadius: 8 }} />;
};

export default TryonCanvas;
