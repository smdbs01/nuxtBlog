import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username") || "";
  console.log(username);
  const userAny = await db.select().from(users).where(eq(users.name, username));
  if (!userAny.length) {
    throw createError({
      statusCode: 404,
      message: "User with username " + username + " not found",
    });
  }
  return userAny[0];
});
