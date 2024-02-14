import { db } from "~/server/db";
import { postTags, posts } from "~/server/db/schema";

import { eq } from "drizzle-orm";
import { postSchema } from "~/server/schema";

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

  const body = await readValidatedBody(event, (body) =>
    postSchema.safeParse(body)
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues.toString(),
    });
  }

  post.title = body.data.title;
  post.content = body.data.content;
  post.published = body.data.published ? 1 : 0;
  post.updatedDate = new Date();

  await db.update(posts).set(post).where(eq(posts.id, id));
  if (body.data.tags.length > 0) {
    await db.delete(postTags).where(eq(postTags.postId, id));
    await db
      .insert(postTags)
      .values(body.data.tags.map((tag) => ({ postId: id, tagId: tag })));
  }

  return "OK";
});
