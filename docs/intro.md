---
slug: /
---

# Getting Started

## Installation

```bash npm2yarn
npm install palette.dev
```

## Usage

Import `init` and pass your API key and the plugins you want to use. Import palette **before all your other imports** in your app's entrypoint file.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="electron" label="Electron">

```ts
// main.js
import { init } from "palette.dev/dist/electron/main";

// ...your other imports
init({
  key: "your-api-key",
});

// renderer.js
import { init } from "palette.dev/dist/electron/renderer";

// ...your other imports
init({
  key: "your-api-key",
});
```

</TabItem>
<TabItem value="browser" label="Browser">

```ts title="index.js"
import { init } from "palette.dev";
// ...your other imports

init({
  key: "your-api-key",
});
```

</TabItem>
</Tabs>
