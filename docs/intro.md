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

#### Main Process

```ts title="main.js (main process)"
import { init, cpu, events } from "@palette.dev/electron/main";

init({
  key: "your-api-key",
  plugins: [
    // Collect CPU usage
    cpu(),
    // BrowserWindow events
    events(),
    // performance marks and entries
    measure(),
  ],
});
```

#### Preload Script

If you have a preload script you need to call `init` from `@palette.dev/electron/preload`. Skip this if you don't have a preload script.

```ts title="preload.js (preload process)"
import { init } from "@palette.dev/electron/preload";

init();
```

#### Renderer Process

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
import { init } from "@palette.dev/browser";

init({
  key: "your-api-key",
});
```

</TabItem>
</Tabs>

## Tagging

```ts
import { tag } from "@palette.dev/electron/renderer";

tag("userId", "u-123");
```

## Custom Metrics

Capture custom metrics with the built-in [`performance.mark()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) and [`performance.measure`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) web APIs. Palette's `measure` plugin records all events recorded by `mark` and `measure`.

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
performance.mark("userAction.start"); // marks starting point
performance.measure("userAction.duration", "userAction.start"); // measures from starting point
```

## Labeling

A label marks a critical interaction in Palette's timeline.

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

// Profile initial react render
labelFn("react.render", () => {
  render(<MyApp />, document.getElementById("root"));
});
```

Labeling is supported in `electron/main`, `electron/renderer`, and `browser` clients.
