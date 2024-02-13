import { db } from "~/server/db";
import { posts, tags, postTags } from "~/server/db/schema";

import { eq } from "drizzle-orm";

import { postTagSchema } from "~/server/schema";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    postTagSchema.safeParse(body)
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues.toString(),
    });
  }
  const tagAny = await db
    .select()
    .from(tags)
    .where(eq(tags.id, body.data.tagId));
  if (!tagAny.length) {
    throw createError({
      statusCode: 404,
      message: "Tag with id " + body.data.tagId + " not found",
    });
  }

  const postAny = await db
    .select()
    .from(posts)
    .where(eq(posts.id, body.data.postId));
  if (!postAny.length) {
    throw createError({
      statusCode: 404,
      message: "Post with id " + body.data.postId + " not found",
    });
  }

  await db
    .insert(postTags)
    .values({ postId: body.data.postId, tagId: body.data.tagId });
  return "OK";
});
