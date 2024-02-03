import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
} as const);

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  createdDate: z.date().default(new Date()),
  updatedDate: z.date().default(new Date()),
  published: z.number().min(0).max(1),
});
