import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid id",
    });
  }

  const postAny = await db
    .select()
    .from(posts)
    .where(and(eq(posts.id, id), eq(posts.published, 1)));
  if (!postAny.length) {
    throw createError({
      statusCode: 404,
      message: "Post with id " + id + " not found",
    });
  }
  return postAny[0];
});
