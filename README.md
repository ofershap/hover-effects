# hover-effects

[![npm version](https://img.shields.io/npm/v/hover-effects-ts)](https://www.npmjs.com/package/hover-effects-ts)
[![npm downloads](https://img.shields.io/npm/dm/hover-effects-ts)](https://www.npmjs.com/package/hover-effects-ts)
[![license](https://img.shields.io/npm/l/hover-effects-ts)](https://github.com/ofershap/hover-effects/blob/main/LICENSE)
[![CI](https://github.com/ofershap/hover-effects/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/hover-effects/actions/workflows/ci.yml)

Canvas-based hover effects for images. ASCII art, pixelate, glitch, blur. Zero dependencies. ~3KB.

![Demo](assets/demo.gif)

## Install

```bash
npm install hover-effects-ts
```

## Quick Start

```html
<img id="photo" src="photo.jpg" />
```

```typescript
import { HoverEffect, pixelate } from "hover-effects-ts";

new HoverEffect({
  element: document.querySelector("#photo"),
  effect: pixelate(10),
});
```

Hover the image to see it pixelate. Mouse out to restore.

## Effects

### Pixelate

```typescript
import { pixelate } from "hover-effects-ts";

pixelate(10); // block size in pixels (default: 10)
```

### ASCII

```typescript
import { ascii } from "hover-effects-ts";

ascii({ fontSize: 8, chars: " .:-=+*#%@" });
```

### Glitch

```typescript
import { glitch } from "hover-effects-ts";

glitch({ slices: 20, offset: 30 });
```

### Blur

```typescript
import { blur } from "hover-effects-ts";

blur(8); // radius in pixels (default: 8)
```

## Custom Effects

Create your own effect by implementing the `EffectFn` type:

```typescript
import { HoverEffect, type EffectFn } from "hover-effects-ts";

const invert: EffectFn = ({ ctx, image, width, height }) => {
  ctx.drawImage(image, 0, 0, width, height);
  ctx.globalCompositeOperation = "difference";
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
};

new HoverEffect({ element: img, effect: invert });
```

## API

### `new HoverEffect(options)`

| Option    | Type                  | Default   | Description              |
| --------- | --------------------- | --------- | ------------------------ |
| `element` | `HTMLImageElement`    | —         | Target image element     |
| `effect`  | `EffectFn`            | —         | Effect function to apply |
| `trigger` | `"hover" \| "always"` | `"hover"` | When to apply the effect |

### Instance Methods

| Method          | Description                           |
| --------------- | ------------------------------------- |
| `setEffect(fn)` | Switch to a different effect          |
| `destroy()`     | Remove canvas, restore original image |

### `useSpotlight` Hook (headless)

For React integration, use the `EffectFn` type with a canvas ref.

## Other Projects

- [spotlight-card](https://github.com/ofershap/spotlight-card) — Animated spotlight card for React
- [ts-result](https://github.com/ofershap/ts-result) — Rust-style Result<T, E> for TypeScript
- [ts-nano-event](https://github.com/ofershap/ts-nano-event) — Typed event emitter in <200 bytes

## License

MIT
