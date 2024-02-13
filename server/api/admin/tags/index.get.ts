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

  return await db.query.tags.findMany({
    orderBy: (tags, { desc }) => [desc(tags.order), desc(tags.id)],
    limit: query.data.pageSize,
    offset: (query.data.page - 1) * query.data.pageSize,
    with: {
      postTags: {
        columns: {},
        with: {
          post: {
            columns: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
});
