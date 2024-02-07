import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { loginSchema } from "~/server/schema.ts";
import { error } from "~/utils/logger";
import { comparePasswords } from "~/server/utils/passwordUtil";

export async function verify(credentials: any) {
  const parsedCredentials = loginSchema.safeParse(credentials);
  if (!parsedCredentials.success) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const userAny = await db
    .select()
    .from(users)
    .where(eq(users.name, parsedCredentials.data.username || ""));
  if (!userAny.length) {
    error(
      "User with username " + parsedCredentials.data.username + " not found"
    );
    throw createError({
      statusCode: 404,
      message:
        "User with username " + parsedCredentials.data.username + " not found",
    });
  }

  const match = await comparePasswords(
    parsedCredentials.data.password || "",
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
}
