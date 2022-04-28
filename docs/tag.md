# Tags

Tags allow you to provide additional information to palette.

Often you'll want to attach a session id and a user id with a tag to identify users.

```ts {7-8} title="index.js"
import { setTag, removeTag } from "@palette.dev/electron/renderer";

init({
  // ...
});

setTag("userId", "u-123");
setTag("sessionId", "s-123");

// Removing tags
removeTag("userId");
```
