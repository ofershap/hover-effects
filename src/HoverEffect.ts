import type { EffectFn, EffectContext } from "./types";

export interface HoverEffectOptions {
  element: HTMLImageElement;
  effect: EffectFn;
  trigger?: "hover" | "always";
}

export class HoverEffect {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private effect: EffectFn;
  private trigger: "hover" | "always";
  private animationId: number | null = null;
  private isHovered = false;
  private isDestroyed = false;

  private handleMouseEnter = () => {
    this.isHovered = true;
    this.startAnimation();
  };

  private handleMouseLeave = () => {
    this.isHovered = false;
    this.stopAnimation();
    this.drawOriginal();
  };

  constructor(options: HoverEffectOptions) {
    this.image = options.element;
    this.effect = options.effect;
    this.trigger = options.trigger ?? "hover";

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    this.canvas.width = this.image.naturalWidth || this.image.width;
    this.canvas.height = this.image.naturalHeight || this.image.height;
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.image.style.display = "none";
    this.image.parentNode?.insertBefore(this.canvas, this.image.nextSibling);

    if (this.trigger === "hover") {
      this.canvas.addEventListener("mouseenter", this.handleMouseEnter);
      this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
      this.drawOriginal();
    } else {
      this.isHovered = true;
      this.startAnimation();
    }
  }

  private getContext(): EffectContext {
    return {
      canvas: this.canvas,
      ctx: this.ctx,
      image: this.image,
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  private drawOriginal(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }

  private startAnimation(): void {
    if (this.animationId !== null) return;

    const animate = () => {
      if (this.isDestroyed) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.effect(this.getContext());

      if (this.isHovered || this.trigger === "always") {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  setEffect(effect: EffectFn): void {
    this.effect = effect;
  }

  destroy(): void {
    this.isDestroyed = true;
    this.stopAnimation();
    this.canvas.removeEventListener("mouseenter", this.handleMouseEnter);
    this.canvas.removeEventListener("mouseleave", this.handleMouseLeave);
    this.image.style.display = "";
    this.canvas.remove();
  }
}
