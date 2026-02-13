import type { EffectFn } from "../types";

export function pixelate(blockSize = 10): EffectFn {
  return ({ ctx, image, width, height }) => {
    ctx.imageSmoothingEnabled = false;
    const scaledW = Math.ceil(width / blockSize);
    const scaledH = Math.ceil(height / blockSize);
    ctx.drawImage(image, 0, 0, scaledW, scaledH);
    ctx.drawImage(ctx.canvas, 0, 0, scaledW, scaledH, 0, 0, width, height);
  };
}
