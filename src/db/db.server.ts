import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

export const db = (database: any) => drizzle(database);
