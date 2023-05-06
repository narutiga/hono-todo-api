import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

export const db = (database: D1Database): DrizzleD1Database =>
  drizzle(database);
