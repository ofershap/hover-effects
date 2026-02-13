import type { EffectFn } from "../types";

export function glitch(
  options: { slices?: number; offset?: number } = {},
): EffectFn {
  const { slices = 20, offset = 30 } = options;

  return ({ ctx, image, width, height }) => {
    ctx.drawImage(image, 0, 0, width, height);

    const sliceHeight = Math.ceil(height / slices);

    for (let i = 0; i < slices; i++) {
      const y = i * sliceHeight;
      const dx = Math.round((Math.random() - 0.5) * offset);

      ctx.drawImage(
        ctx.canvas,
        0,
        y,
        width,
        sliceHeight,
        dx,
        y,
        width,
        sliceHeight,
      );
    }

    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = `rgba(255, 0, 0, ${0.05 + Math.random() * 0.05})`;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
  };
}
