import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

import { paginationSchema } from "~/server/schema";

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

  return await db.query.posts.findMany({
    where: eq(posts.published, 1),
    orderBy: (posts, { desc }) => [desc(posts.createdDate), desc(posts.id)],
    limit: query.data.pageSize,
    offset: (query.data.page - 1) * query.data.pageSize,
    with: {
      postTags: {
        columns: {},
        with: {
          tag: true,
        },
      },
    },
  });
});
