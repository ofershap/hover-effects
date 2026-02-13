import type { EffectFn } from "../types";

export function blur(radius = 8): EffectFn {
  return ({ ctx, image, width, height }) => {
    ctx.filter = `blur(${radius}px)`;
    ctx.drawImage(image, 0, 0, width, height);
    ctx.filter = "none";
  };
}
