import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { eq } from "drizzle-orm";

import { error } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (Number.isNaN(id)) {
    error("Invalid id: " + id);
    throw createError({
      statusCode: 400,
      message: "Invalid id",
    });
  }

  const userAny = await db.select().from(users).where(eq(users.id, id));
  if (!userAny.length) {
    error("User with id " + id + " not found");
    throw createError({
      statusCode: 404,
      message: "Post with id " + id + " not found",
    });
  }
  const user = userAny[0];

  const body = await readBody(event);

  const nameUsed = await db
    .select()
    .from(users)
    .where(eq(users.name, body.name));
  if (nameUsed.length) {
    error("Name already in use: " + body.name);
    throw createError({
      statusCode: 400,
      message: "Name already in use",
    });
  }

  user.name = body.name;
  user.password = await hashPassword(body.password);
  user.updatedDate = new Date();

  await db.update(users).set(user).where(eq(users.id, id));
});
