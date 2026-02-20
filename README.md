# Hover Effects — Canvas-Based Image Hover Effects (ASCII, Pixelate, Glitch, Blur)

[![npm version](https://img.shields.io/npm/v/hover-effects-canvas.svg)](https://www.npmjs.com/package/hover-effects-canvas)
[![npm downloads](https://img.shields.io/npm/dm/hover-effects-canvas.svg)](https://www.npmjs.com/package/hover-effects-canvas)
[![CI](https://github.com/ofershap/hover-effects/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/hover-effects/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Drop-in canvas-based hover effects for images — ASCII art, pixelate, glitch, blur. TypeScript, zero dependencies, ~3KB.

```typescript
import { HoverEffect, pixelate } from "hover-effects-canvas";

new HoverEffect({
  element: document.querySelector("#photo"),
  effect: pixelate(10),
});
```

> Drop-in image hover effects powered by Canvas2D. Four built-in effects, custom effect API, no dependencies.

![hover-effects demo — ASCII art, pixelate, glitch, and blur effects on image hover](assets/demo.gif)

## Install

```bash
npm install hover-effects-canvas
```

## Quick Start

```html
<img id="photo" src="photo.jpg" />
```

```typescript
import { HoverEffect, pixelate } from "hover-effects-canvas";

new HoverEffect({
  element: document.querySelector("#photo"),
  effect: pixelate(10),
});
```

Hover the image to see it pixelate. Mouse out to restore.

## Effects

### Pixelate

```typescript
import { pixelate } from "hover-effects-canvas";

pixelate(10); // block size in pixels (default: 10)
```

### ASCII

```typescript
import { ascii } from "hover-effects-canvas";

ascii({ fontSize: 8, chars: " .:-=+*#%@" });
```

### Glitch

```typescript
import { glitch } from "hover-effects-canvas";

glitch({ slices: 20, offset: 30 });
```

### Blur

```typescript
import { blur } from "hover-effects-canvas";

blur(8); // radius in pixels (default: 8)
```

## Custom Effects

Create your own effect by implementing the `EffectFn` type:

```typescript
import { HoverEffect, type EffectFn } from "hover-effects-canvas";

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

## Author

[![Made by ofershap](https://gitshow.dev/api/card/ofershap)](https://gitshow.dev/ofershap)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/ofershap)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github&logoColor=white)](https://github.com/ofershap)

## License

MIT
