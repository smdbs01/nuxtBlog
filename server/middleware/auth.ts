import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith("/api/admin")) {
    return;
  }

  const session = await getServerSession(event);
  // @ts-expect-error
  if (!session || session.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }
});
