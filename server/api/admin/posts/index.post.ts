import { db } from "~/server/db";
import { postTags, posts } from "~/server/db/schema";

import { postSchema } from "~/server/schema";
import { desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    postSchema.safeParse(body)
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues.toString(),
    });
  }

  await db.insert(posts).values(body.data);

  if (body.data.tags.length > 0) {
    const postId = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.id))
      .limit(1);
    await db
      .insert(postTags)
      .values(
        body.data.tags.map((tag) => ({ postId: postId[0].id, tagId: tag }))
      );
  }
  return "OK";
});
