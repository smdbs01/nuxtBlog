import { asc } from "drizzle-orm";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { paginationSchema } from "~/server/schema.ts";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    paginationSchema.safeParse(body)
  );
  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid pagination query",
    });
  }

  return await db
    .select()
    .from(posts)
    .orderBy(asc(posts.createdDate))
    .limit(query.data.pageSize)
    .offset((query.data.page - 1) * query.data.pageSize);
});
