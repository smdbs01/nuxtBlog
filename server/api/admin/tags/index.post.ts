import { db } from "~/server/db";
import { tags } from "~/server/db/schema";

import { tagSchema } from "~/server/schema";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    tagSchema.safeParse(body)
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues.toString(),
    });
  }

  await db.insert(tags).values(body.data);
  return "OK";
});
