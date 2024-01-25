import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid id",
    });
  }

  const postAny = await db.select().from(posts).where(eq(posts.id, id));
  if (!postAny.length) {
    throw createError({
      statusCode: 404,
      message: "Post with id " + id + " not found",
    });
  }
  const post = postAny[0];

  const body = await readBody(event);
  post.title = body.title;
  post.content = body.content;
  post.updatedDate = new Date();

  await db.update(posts).set(post).where(eq(posts.id, id));
});
