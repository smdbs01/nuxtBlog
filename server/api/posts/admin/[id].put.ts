import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { eq } from "drizzle-orm";

import { postSchema } from "~/server/schema.ts";

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

  const bodyResult = postSchema.safeParse(body);
  post.title = bodyResult.success ? bodyResult.data.title : post.title;
  post.content = bodyResult.success ? bodyResult.data.content : post.content;
  post.published = bodyResult.success
    ? bodyResult.data.published
      ? 1
      : 0
    : post.published;
  post.updatedDate = new Date();

  await db.update(posts).set(post).where(eq(posts.id, id));
});
