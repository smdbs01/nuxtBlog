import { getAuthSession } from "~/server/utils/session";
import { error } from "~/utils/logger";

export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith("/api/admin")) {
    return;
  }

  const session = await getAuthSession(event);
  // @ts-expect-error
  if (!session || session.role !== "admin") {
    error("Forbidden");
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }
});
