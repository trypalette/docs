# Using Plugins

Palette allows you to import only what you need.

## Electron Main

```ts
import { init, cpu } from "@palette.dev/electron/main";

init({
  key: "your-api-key",
  plugins: [cpu()],
});
```

## Electron Renderer

```ts
import { init, cpu, events, vitals } from "@palette.dev/electron/renderer";

init({
  key: "your-api-key",
  plugins: [cpu(), events(), vitals()],
});
```
