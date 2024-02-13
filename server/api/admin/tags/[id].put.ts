import { db } from "~/server/db";
import { tags } from "~/server/db/schema";
import { eq } from "drizzle-orm";

import { tagSchema } from "~/server/schema";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid id",
    });
  }

  const tagAny = await db.select().from(tags).where(eq(tags.id, id));
  if (!tagAny.length) {
    throw createError({
      statusCode: 404,
      message: "Post with id " + id + " not found",
    });
  }
  const tag = tagAny[0];

  const body = await readValidatedBody(event, (body) =>
    tagSchema.safeParse(body)
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues.toString(),
    });
  }

  tag.name = body.data.name;
  tag.disabled = body.data.disabled ? 1 : 0;
  tag.updatedDate = new Date();

  await db.update(tags).set(tag).where(eq(tags.id, id));
  return "OK";
});
