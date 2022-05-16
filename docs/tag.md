# Tags

Tags allow you to provide additional context about a user's session that might be useful later.

Often you'll want to tag a session id and a user id with a tag to identify users.

```ts {7-8} title="index.js"
import { tag } from "@palette.dev/electron/renderer";

tag("userId", "u-123");
```
