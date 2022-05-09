# Sampling Patterns

## Frequent Events

This pattern works well for user interactions like typing, dragging, and clicking. Generally, an user action that may be repeated multiple times works well with this pattern.

```ts
import { cpu, label } from "@palette.dev/electron/renderer";

const debounceMeasure = (
  fn: () => void,
  _opts?: { name?: string; timeout?: number }
) => {
  const { name, timeout } = {
    name: fn.name ?? "anonymous",
    timeout: 1_000,
    ..._opts,
  };

  let timeoutId: ReturnType<typeof global.setTimeout> | undefined;

  return () => {
    if (timeoutId === undefined || timeoutId === null) {
      label.start(name); // Mark the start of the label
      cpu.start(); // Start cpu profiler
    } else {
      clearTimeout(timeoutId);
    }

    fn(); // Invoke the function to be profiled

    // Debounce marking the end of the label
    timeoutId = setTimeout(() => {
      cpu.stop();
      label.end(name); // Mark the end of the label
      timeoutId = undefined;
    }, timeout);
  };
};
```

#### Examples of `debounceMeasure`

```tsx
const _handleInput = debounceMeasure(handleInput, {
  name: "input-delay",
  timeout: 1_000,
});

const Input = () => (
  <input placeholder="type something" onChange={_handleInput} />
);
```

Here's an example of how `debounceMeasure` would handle `keypress` events:

| Event    | Time | Debounce Timeout | Action                                                 |
| -------- | ---- | ---------------- | ------------------------------------------------------ |
| keypress | 0s   | 1s               | calls `_handleInput` and marks _start_ of label        |
| keypress | 1s   | 1s               | calls `_handleInput` and marks _end_ of label          |
| keypress | 3s   | 1s               | calls `_handleInput`, marks _start_ and _end_ of label |

## Infrequent Events

These events tend to be one-off events

- App startup
- Routing changes
- Loading third-party scripts
- Animations

```ts
import { cpu, label } from "@palette.dev/electron/renderer";

const measureFn = (name: string, fn: () => void) => {
  label.start(name);
  cpu.start();
  fn();
  cpu.stop();
  label.end(name);
};
```

#### Examples of `measureFn`:

```ts
measureFn("load-3p-scripts", () => {
  loadScript("https://cdn.example.com/my-scripts.js");
});
```

## Conditional Sampling

You'll often want to sample only a subset of your users.

Here's how you could enable sampling in your staging environment:

```ts {3,11,16}
import { init, cpu, label } from "@palette.dev/electron/main";

if (myApp.isStaging) {
  init({
    key: "your-api-key",
    plugins: [cpu()],
  });
}

const measureFn = (name: string, fn: () => void) => {
  if (myApp.isStaging) {
    label.start(name);
    cpu.start();
  }
  fn();
  if (myApp.isStaging) {
    cpu.stop();
    label.end(name);
  }
};
```
