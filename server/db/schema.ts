import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  serial,
  timestamp,
  text,
  bigint,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  published: int("published").notNull(),
  createdDate: timestamp("createdDate", { mode: "date" }).notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).notNull(),
});

export const postRelations = relations(posts, ({ many }) => ({
  postTags: many(postTags),
}));

export const tags = mysqlTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  order: int("order").notNull(),
  color: varchar("color", { length: 255 }).notNull(),
  createdDate: timestamp("createdDate", { mode: "date" }).notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).notNull(),
});

export const tagRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTags = mysqlTable(
  "post_tags",
  {
    postId: bigint("postId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: bigint("tagId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.postId, t.tagId] }),
    };
  }
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));

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
