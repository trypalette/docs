# Events

Palette's `event` plugin captures events triggered by the user. Events are like a trail of breadcrumbs that lead to a janky experience.

In the browser this means capturing click events like `keypress` and `click`. In electron's main process, `BrowserWindow` events like `move`, `show`, and `hide` are captured.

### Usage

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="electron-main" label="Electron Main">

```ts {11}
import { init, events } from "@palette.dev/electron/main";

init({
  key: "your-api-key",
  plugins: [
    events(),
    // ...
  ],
});
```

</TabItem>

<TabItem value="electron-renderer" label="Electron Renderer">

```ts {6}
import { init, events } from "@palette.dev/electron/renderer";

init({
  key: "your-api-key",
  plugins: [
    events(),
    // ...
  ],
});
```

</TabItem>
</Tabs>
