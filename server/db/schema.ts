import {
  int,
  mysqlTable,
  varchar,
  serial,
  timestamp,
  text,
  bigint,
} from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  published: int("published").notNull(),
  createdDate: timestamp("createdDate", { mode: "date" }).notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).notNull(),
});

export const tags = mysqlTable("tags", {
  id: serial("id").primaryKey(),
  disabled: int("disabled").notNull(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdDate: timestamp("createdDate", { mode: "date" }).notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).notNull(),
});

export const postTags = mysqlTable("postTags", {
  id: serial("id").primaryKey(),
  postId: bigint("postId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => posts.id),
  tagId: bigint("tagId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => tags.id),
});

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 10, enum: ["admin", "user"] }).notNull(),
  createdDate: timestamp("createdDate", { mode: "date" }).notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).notNull(),
});

export const comments = mysqlTable("comments", {
  id: serial("id").primaryKey(),
  postId: bigint("postId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => posts.id),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  createdDate: timestamp("createdDate", { mode: "date" }).notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).notNull(),
});
