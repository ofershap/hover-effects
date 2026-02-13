import { describe, it, expect, vi, beforeEach } from "vitest";
import { HoverEffect } from "../src/HoverEffect";

const mockCtx = {
  drawImage: vi.fn(),
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
  getImageData: vi.fn().mockReturnValue({ data: new Uint8ClampedArray(4) }),
  imageSmoothingEnabled: true,
  filter: "none",
  font: "",
  textBaseline: "",
  fillStyle: "",
  globalCompositeOperation: "source-over",
};

HTMLCanvasElement.prototype.getContext = vi
  .fn()
  .mockReturnValue(
    mockCtx,
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;

function createMockImage(): HTMLImageElement {
  const img = document.createElement("img");
  Object.defineProperty(img, "naturalWidth", { value: 200 });
  Object.defineProperty(img, "naturalHeight", { value: 150 });
  document.body.appendChild(img);
  return img;
}

describe("HoverEffect", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("creates a canvas element next to the image", () => {
    const img = createMockImage();
    const effect = vi.fn();
    new HoverEffect({ element: img, effect });
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeTruthy();
  });

  it("hides the original image", () => {
    const img = createMockImage();
    new HoverEffect({ element: img, effect: vi.fn() });
    expect(img.style.display).toBe("none");
  });

  it("restores image on destroy", () => {
    const img = createMockImage();
    const instance = new HoverEffect({ element: img, effect: vi.fn() });
    instance.destroy();
    expect(img.style.display).toBe("");
    expect(document.querySelector("canvas")).toBeNull();
  });

  it("allows changing effect", () => {
    const img = createMockImage();
    const effect1 = vi.fn();
    const effect2 = vi.fn();
    const instance = new HoverEffect({ element: img, effect: effect1 });
    instance.setEffect(effect2);
    instance.destroy();
  });
});
