# Tags

Tags allow you to provide additional information to palette.

Often you'll want to attach a session id and a user id with a tag to identify users.

```ts {7-8} title="index.js"
import { tag } from "@palette.dev/electron/renderer";

tag("userId", "u-123");
```
