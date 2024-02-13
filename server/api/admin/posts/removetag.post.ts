import { db } from "~/server/db";
import { posts, tags, postTags } from "~/server/db/schema";

import { eq, and } from "drizzle-orm";

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

  const postTagAny = await db
    .select()
    .from(postTags)
    .where(
      and(
        eq(postTags.postId, body.data.postId),
        eq(postTags.tagId, body.data.tagId)
      )
    );
  if (!postTagAny.length) {
    throw createError({
      statusCode: 404,
      message:
        "PostTag with postId " +
        body.data.postId +
        " and tagId " +
        body.data.tagId +
        " not found",
    });
  }

  await db.delete(postTags).where(eq(postTags.id, postTagAny[0].id));
  return "OK";
});
