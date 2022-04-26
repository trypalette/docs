---
slug: /
---

# Getting Started

## Installation

<Tabs>
<TabItem value="electron" label="Electron">

```npm2yarn
npm install @palette.dev/electron
```

</TabItem>
<TabItem value="browser" label="Browser">

```npm2yarn
npm install @palette.dev/browser
```

</TabItem>
</Tabs>

## Usage

Import `init` and pass your API key and the plugins you want to use. Import palette **before all other imports** in your app's entrypoint file.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="electron" label="Electron">

```ts title="main.js (main process)"
import { init, cpu, events } from "@palette.dev/electron/main";
import { app } from "electron";

app.whenReady().then(() => {
  const window = new BrowserWindow({
    // ...
  });

  init({
    key: "your-api-key",
    plugins: [
      // Collect CPU usage
      cpu(),
      // BrowserWindow events
      events({ window }),
      // performance marks and entries
      measure(),
    ],
  });
});
```

```ts title="renderer.js (renderer process)"
import {
  init,
  cpu,
  events,
  vitals,
  measure,
  network,
} from "@palette.dev/electron/renderer";

init({
  key: "your-api-key",
  plugins: [
    // Collect CPU usage
    cpu(),
    // click events
    events(),
    // web core vitals
    vitals(),
    // network events
    network(),
    // performance marks and entries
    measure(),
  ],
});
```

</TabItem>
<TabItem value="browser" label="Browser">

```ts title="index.js"
import { init } from "palette.dev";

init({
  key: "your-api-key",
});
```

</TabItem>
</Tabs>

## Tagging

```ts
import { setTag } from "@palette.dev/electron/renderer";

setTag("userId", "u-123");
setTag("sessionId", "s-123");
```

## Custom Metrics

Caputure custom metrics with the built-in [`performance.mark()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) and [`performance.measure`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) web APIs. Palette's `measure` plugin records all events recorded by `mark` and `measure`.

:::tip

**In electron's main process, import `performance`**

```ts
import { performance } from "perf_hooks";
```

:::

```ts
// Mark events at a specific action or event
performance.mark("myApp.someUserEvent", {
  detail: "some event details",
});
performance.mark("myApp.stateChange", {
  detail: {
    from: "stateA",
    to: "stateB",
  },
});

// Measuring time durations
performance.mark("userAction.start"); // marks staring point
performance.measure("userAction.duration", "userAction.start"); // measures from starting point
```

## Labeling

A label is a special kind of [measurement](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) that demarcates a critical interaction in Palette's session view.

```ts
import { label } from "@palette.dev/electron/renderer";

// Label and profile specific interactions or events
const labelFn = (name, fn) => {
  label.start(name);
  cpu.start({ samplingInterval: 500 });
  fn();
  cpu.stop();
  label.end(name);
};

// Profiling initial react render
labelFn("react.render", () => {
  render(<MyApp />, document.getElementById("root"));
});
```

Labeling is supported in `electron/main`, `electron/renderer`, and `browser` clients.
