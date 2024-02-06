import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { eq } from "drizzle-orm";
import { error } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (Number.isNaN(id)) {
    error("Invalid id");
    throw createError({
      statusCode: 400,
      message: "Invalid id",
    });
  }

  const postAny = await db.select().from(posts).where(eq(posts.id, id));
  if (!postAny.length) {
    error("Post with id " + id + " not found");
    throw createError({
      statusCode: 404,
      message: "Post with id " + id + " not found",
    });
  }
  await db.delete(posts).where(eq(posts.id, id));
});
