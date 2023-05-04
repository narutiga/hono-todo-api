import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
});

export const todos = sqliteTable("todos", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  completed: integer("completed").notNull().default(0),
  createdAt: text("createdAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  userId: text("userId").references(() => users.id),
});
