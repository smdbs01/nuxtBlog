import { count } from "drizzle-orm";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default defineEventHandler(async () => {
  const result = await db.select({ value: count(posts.id) }).from(posts);

  return result[0].value;
});
