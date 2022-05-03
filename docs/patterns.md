# Sampling Patterns

## Frequent Events

This pattern works well for user interactions like typing, dragging, and clicking. Generally, an user action that may be repeated multiple times works well with this pattern.

```ts
import { cpu, label } from "@palette.dev/electron/renderer";

let _timeoutId: number;

const debounceMeasure = (label: string, timeout: number, fn: () => void) => {
  return () => {
    if (_timeoutId === undefined || _timeoutId === null) {
      clearTimeout(_timeoutId);
    } else {
      label.start(label); // Mark the start of the label
      cpu.start(); // Start cpu sampling
    }

    fn(); // Invoke the function to be profiled

    // Debounce marking the end of the label
    _timeoutId = setTimeout(() => {
      cpu.stop(); // Stop cpu sampling
      label.end(label); // Mark the end of the label
      _timeoutId = undefined;
    }, timeout);
  };
};

const fib = () => {
  /* ... */
};
const fibAndMeasure = debounceMeasure("input-delay", 1_000, fib);
```

#### Examples of `debounceMeasure`:

Suppose we had this code:

```ts
const _fib = debounceMeasure("input-delay", 1_000, fib);
document.addEventListener("keydown", _fib);
```

Here's what happens:

| Event    | Time | Action                                        |
| -------- | ---- | --------------------------------------------- |
| keypress | 0s   | calls `fib` and marks _start_ of label        |
| keypress | 1s   | calls `fib` and marks _end_ of label          |
| keypress | 3s   | calls `fib`, marks _start_ and _end_ of label |

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
