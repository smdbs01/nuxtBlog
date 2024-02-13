import { count } from "drizzle-orm";

import { db } from "~/server/db";
import { tags } from "~/server/db/schema";

export default defineEventHandler(async () => {
  const result = await db.select({ value: count(tags.id) }).from(tags);

  return result[0].value;
});
