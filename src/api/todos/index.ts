import { Hono } from "hono";
import { Env } from "../../bindings";
import { db } from "../../db/db.server";
import {
  createTodo,
  CreateTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  UpdateTodo,
} from "./model";

const todos = new Hono<{ Bindings: Env }>();

todos.get("/", async (c) => {
  const todos = await getTodos(db(c.env.DB));
  return c.json(todos);
});

todos.post("/", async (c) => {
  const param = await c.req.json<CreateTodo>();
  const newTodo = await createTodo(db(c.env.DB), param);

  return c.json(newTodo, 201);
});

todos.put("/:id", async (c) => {
  const id = c.req.param("id");
  const param = await c.req.json<UpdateTodo>();
  const updatedTodo = await updateTodo(db(c.env.DB), id, param);

  return c.text("todo updated!");
});

todos.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await deleteTodo(db(c.env.DB), id);

  return c.text("todo deleted!");
});

export { todos };
