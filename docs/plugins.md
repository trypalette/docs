---
sidebar_position: 2
---

# Plugins

Plugins are the foundation of great Palette's SDK. You need to opt into functionality.

```ts
import { init, vitals, errors, breadcrumbs, fps } from "palette.dev";

init({
  key: "<api key>",
  plugins: [
    // Collect errors
    errors({
      warnings: false,
    }),
    // Collect web core vitals
    vitals(),
    // Collect click, navigation, and other events
    breadcrumbs(),
  ],
});

breadcrumbs.disable();
```
