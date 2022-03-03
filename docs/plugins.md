# Using Plugins

Palette allows you to import only what you need.

## Electron Main

```ts
import { init, cpu } from "palette.dev/dist/electron/main";

init({
  key: "your-api-key",
  plugins: [cpu()],
});
```

## Electron Renderer

```ts
import {
  init,
  cpu,
  breadcrumbs,
  vitals,
} from "palette.dev/dist/electron/renderer";

init({
  key: "your-api-key",
  plugins: [cpu(), breadcrumbs(), vitals()],
});
```
