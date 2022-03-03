---
title: CPU
---

# CPU Monitoring

:::caution

**This API is only supported in electron. It isn't supported in the renderer process when `nodeIntegration` is true**

:::

### Usage

The CPU plugin collects CPU samples from electron's renderer and main processes.

```ts {5} title="main.js"
import { init, cpu } from "palette.dev/dist/electron/main";

init({
  key: "your-api-key",
  plugins: [cpu()],
});
```

```ts {5} title="renderer.js"
import { init, cpu, breadcrumbs } from "palette.dev/dist/electron/renderer";

init({
  key: "your-api-key",
  plugins: [breadcrumbs(), cpu()],
});
```

### Sampling Rate

CPU samples are collected in intervals. The default sample rate is `1000 ms`.

```ts {7} title="main.js"
import { init, cpu } from "palette.dev/dist/electron/main";

init({
  key: "your-api-key",
  plugins: [
    cpu({
      samplingRate: 1_000,
    }),
  ],
});
```

A smaller sampling rate provides more accurate reporting while a greater one will consume less resources.

### Starting and Stopping Sampling

```ts {4,6} title="main.js"
import { cpu } from "palette.dev/dist/electron/main";

if (userIsIdle) {
  cpu.stop();
} else {
  cpu.start();
}
```
