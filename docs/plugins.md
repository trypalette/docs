---
sidebar_position: 2
---

# Plugins

Plugins are the foundation of great Palette's SDK. You need to opt into functionality.

```ts
import { init, cpu } from "palette.dev";

init({
  key: "<api key>",
  plugins: [
    cpu({
      sampleRate: 1_000, // Collect cpu samples every 1000ms
    }),
  ],
});

breadcrumbs.disable();
```
