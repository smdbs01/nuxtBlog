import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { error } from "~/utils/logger";

export default defineEventHandler(async (event) => {
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
  body.password = await hashPassword(body.password);
  body.createdDate = new Date();
  body.updatedDate = new Date();

  await db.insert(users).values(body);
  return "OK";
});
