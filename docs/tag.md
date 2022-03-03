# Tags

Tags allow you to provide additional information to palette.

Often you'll want to attach a session id and a user id with a tag to idenfity users.

```ts {7-8} title="index.js"
import { addTag } from "palette.dev/dist/electron/renderer";

init({
  // ...
});

addTag("userId", "u-123");
addTag("sessionId", "s-123");
```
