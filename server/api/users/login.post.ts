import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { loginSchema } from "~/server/schema.ts";
import { error } from "~/utils/logger";
import { comparePasswords } from "~/server/utils/passwordUtil";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.safeParse(body)
  );

  if (!body.success) {
    error("Invalid login");
    throw createError({
      statusCode: 400,
      message: "Invalid Login Details",
    });
  }

  const userAny = await db
    .select()
    .from(users)
    .where(eq(users.name, body.data.username || ""));
  if (!userAny.length) {
    error("User with username " + body.data.username + " not found");
    throw createError({
      statusCode: 404,
      message: "User with username " + body.data.username + " not found",
    });
  }

  const match = await comparePasswords(
    body.data.password || "",
    userAny[0].password
  );
  if (match) {
    return userAny[0];
  } else {
    error("Invalid password");
    throw createError({
      statusCode: 403,
      message: "Invalid password",
    });
  }
});
