import {
  int,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
  timestamp,
  text
} from "drizzle-orm/mysql-core"

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  published: int("published").notNull(),
  createdDate: timestamp("createdDate", { mode: "date" }).defaultNow().notNull(),
  updatedDate: timestamp("updatedDate", { mode: "date" }).defaultNow().notNull(),
})