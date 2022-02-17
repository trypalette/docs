---
sidebar_position: 1
slug: /
---

# Introduction

## Installation

```bash npm2yarn
npm install palette.dev
```

```ts
import { init, breadcrumbs } from "palette.dev";

init({
  key: "<api key>",
  plugins: [breadcrumbs()],
});
```
