import { Hono } from "hono";
import {
  CreateTodo,
  Todo,
  UpdateTodo,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./model";
import { Env } from "../bindings";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

const todos = new Hono<{ Bindings: Env }>();

todos.get("/", async (c) => {
  const db: DrizzleD1Database = drizzle(c.env.DB);
  const todos = await getTodos(db);
  return c.json(todos);
});

todos.post("/", async (c) => {
  const db: DrizzleD1Database = drizzle(c.env.DB);
  const param = await c.req.json<CreateTodo>();
  const newTodo = await createTodo(db, param);

  return c.json(newTodo, 201);
});

todos.put("/:id", async (c) => {
  const db: DrizzleD1Database = drizzle(c.env.DB);
  const id = c.req.param("id");
  const param = await c.req.json<UpdateTodo>();
  const updatedTodo = await updateTodo(db, id, param);

  return c.text("todo updated!");
});

todos.delete("/:id", async (c) => {
  const db: DrizzleD1Database = drizzle(c.env.DB);
  const id = c.req.param("id");
  await deleteTodo(db, id);

  return c.text("todo deleted!");
});

export { todos };
