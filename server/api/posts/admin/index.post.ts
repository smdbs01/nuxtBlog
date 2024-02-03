import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { postSchema } from "~/server/schema.ts";

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
  return "OK";
});
