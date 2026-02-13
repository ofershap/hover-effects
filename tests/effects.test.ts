import { describe, it, expect, vi } from "vitest";
import { pixelate } from "../src/effects/pixelate";
import { blur } from "../src/effects/blur";
import { glitch } from "../src/effects/glitch";
import type { EffectContext } from "../src/types";

function createMockContext(): EffectContext {
  const canvas = {
    width: 100,
    height: 100,
  } as HTMLCanvasElement;

  const ctx = {
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn().mockReturnValue({
      data: new Uint8ClampedArray(100 * 100 * 4),
    }),
    imageSmoothingEnabled: true,
    filter: "none",
    font: "",
    textBaseline: "",
    fillStyle: "",
    globalCompositeOperation: "source-over",
    canvas,
  } as unknown as CanvasRenderingContext2D;

  const image = {} as HTMLImageElement;

  return { canvas, ctx, image, width: 100, height: 100 };
}

describe("pixelate", () => {
  it("is a function factory", () => {
    const effect = pixelate(10);
    expect(typeof effect).toBe("function");
  });

  it("calls drawImage twice (scale down + scale up)", () => {
    const context = createMockContext();
    pixelate(10)(context);
    expect(context.ctx.drawImage).toHaveBeenCalledTimes(2);
  });

  it("disables image smoothing", () => {
    const context = createMockContext();
    pixelate(10)(context);
    expect(context.ctx.imageSmoothingEnabled).toBe(false);
  });

  it("uses custom block size", () => {
    const context = createMockContext();
    pixelate(20)(context);
    expect(context.ctx.drawImage).toHaveBeenCalledWith(
      context.image,
      0,
      0,
      5,
      5,
    );
  });
});

describe("blur", () => {
  it("sets canvas filter", () => {
    const context = createMockContext();
    blur(12)(context);
    expect(context.ctx.filter).toBe("none");
  });

  it("draws the image", () => {
    const context = createMockContext();
    blur(8)(context);
    expect(context.ctx.drawImage).toHaveBeenCalledWith(
      context.image,
      0,
      0,
      100,
      100,
    );
  });
});

describe("glitch", () => {
  it("draws the base image first", () => {
    const context = createMockContext();
    glitch({ slices: 5, offset: 10 })(context);
    expect(context.ctx.drawImage).toHaveBeenCalled();
  });

  it("resets composite operation", () => {
    const context = createMockContext();
    glitch()(context);
    expect(context.ctx.globalCompositeOperation).toBe("source-over");
  });
});
