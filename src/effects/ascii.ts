import type { EffectFn } from "../types";

const DEFAULT_CHARS = " .:-=+*#%@";

export function ascii(
  options: { fontSize?: number; chars?: string } = {},
): EffectFn {
  const { fontSize = 8, chars = DEFAULT_CHARS } = options;

  return ({ ctx, image, width, height }) => {
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d")!;
    offCtx.drawImage(image, 0, 0, width, height);
    const imageData = offCtx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    for (let y = 0; y < height; y += fontSize) {
      for (let x = 0; x < width; x += fontSize) {
        const idx = (y * width + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const brightness = (r + g + b) / 3;
        const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillText(chars[charIndex], x, y);
      }
    }
  };
}
