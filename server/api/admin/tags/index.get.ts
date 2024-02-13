import { db } from "~/server/db";
import { tags } from "~/server/db/schema";

export default defineEventHandler(async () => {
  return await db.select().from(tags);
});
