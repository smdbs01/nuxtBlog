import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10),
} as const);

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.number().min(0).max(1),
  tags: z.array(z.number()),
  createdDate: z.date().default(new Date()),
  updatedDate: z.date().default(new Date()),
});

export const tagSchema = z.object({
  name: z.string(),
  order: z.number().default(0),
  color: z.string().default("#000000"),
  createdDate: z.date().default(new Date()),
  updatedDate: z.date().default(new Date()),
});

export const postTagSchema = z.object({
  postId: z.number(),
  tagId: z.number(),
});

export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  role: z.enum(["admin", "user"]),
  createdDate: z.date().default(new Date()),
  updatedDate: z.date().default(new Date()),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
