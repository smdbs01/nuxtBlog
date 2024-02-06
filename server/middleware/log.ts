import { logger } from "~/utils/logger";

export default defineEventHandler((event) => {
  if (!event.node.req.url?.startsWith("/api/")) {
    return;
  }
});
