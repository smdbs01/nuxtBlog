import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default defineEventHandler(async () => {
  return await db.select().from(posts);
});
