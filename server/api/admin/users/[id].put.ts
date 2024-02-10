import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { eq, ne, and } from "drizzle-orm";
import { userSchema } from "~/server/schema";

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
  const user = userAny[0];

  const body = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body)
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid body",
    });
  }

  const nameUsed = await db
    .select()
    .from(users)
    .where(and(eq(users.name, body.data.name), ne(users.id, id)));
  if (nameUsed.length) {
    throw createError({
      statusCode: 400,
      message: "Name already in use",
    });
  }

  user.name = body.data.name;
  user.password = await hashPassword(body.data.password);
  user.updatedDate = new Date();

  await db.update(users).set(user).where(eq(users.id, id));
});
