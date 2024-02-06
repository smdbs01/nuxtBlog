import { getServerSession } from "#auth";
import { error } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith("/api/admin")) {
    return;
  }

  const session = await getServerSession(event);
  // @ts-expect-error
  if (!session || session.role !== "admin") {
    error("Forbidden access to admin API");
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }
});
