import { db } from "~/server/db";

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
