# Breadcrumbs

Breadcrumbs capture a user's click events. Breadcrumbs are useful for knowing what actions a user took that led to a perforamnce regression or an error.

You'll almost always want to use the breadcrumbs plugin.

```ts {5} title="index.js"
import { init, breadcrumbs, cpu } from "palette.dev/dist/electron/renderer";

init({
  key: "your-api-key",
  plugins: [breadcrumbs(), cpu()],
});
```
