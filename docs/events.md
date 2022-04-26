# Events

Palette's `event` plugin captures platform events. In the browser this means capturing click events like `keypress` and `click`. In electron, events on `BrowserWindow` like `move`, `show`, and `hide` are captured.

Events are useful for knowing what actions a user took that led to a performance regression or an error.

### Usage

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="electron-main" label="Electron Main">

```ts {11}
import { init, events } from "@palette.dev/electron/main";

app.whenReady().then(() => {
  const window = new BrowserWindow({
    // ...
  });

  init({
    key: "your-api-key",
    plugins: [
      events({ window }),
      // ...
    ],
  });
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
