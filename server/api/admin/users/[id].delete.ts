import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: "Invalid id",
    });
  }

  const userAny = await db.select().from(users).where(eq(users.id, id));
  if (!userAny.length) {
    throw createError({
      statusCode: 404,
      message: "Post with id " + id + " not found",
    });
  }
  await db.delete(users).where(eq(users.id, id));
});
