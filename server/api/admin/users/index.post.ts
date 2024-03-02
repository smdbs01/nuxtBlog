import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { userSchema } from "~/server/schema";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body)
  );
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues.toString(),
    });
  }
  const nameUsed = await db
    .select()
    .from(users)
    .where(eq(users.name, body.data.name));
  if (nameUsed.length) {
    throw createError({
      statusCode: 400,
      message: "Name already in use",
    });
  }
  body.data.password = await hashPassword(body.data.password);

  await db.insert(users).values({...body.data, createdDate: new Date(), updatedDate: new Date()});
  return "OK";
});
