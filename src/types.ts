export interface EffectContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  width: number;
  height: number;
}

export type EffectFn = (context: EffectContext) => void;
