import { DrizzleD1Database } from "drizzle-orm/d1";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export type Todo = {
  id: string;
  title: string;
  completed: number;
};

export type CreateTodo = {
  title: string;
};

export type UpdateTodo = {
  title?: string;
  completed?: number;
};

export const PREFIX = "v1:todo:";

export const getTodos = async (db: DrizzleD1Database): Promise<Todo[]> => {
  const result = await db.select().from(todos).all();

  return result;
};

export const getTodo = async (
  db: DrizzleD1Database,
  id: string
): Promise<Todo | null> => {
  return db.select().from(todos).where(eq(todos.id, id)).get();
};

export const createTodo = async (
  db: DrizzleD1Database,
  param: CreateTodo
): Promise<Todo> => {
  const id = crypto.randomUUID();
  const newTodo: Todo = {
    id,
    title: param.title,
    completed: 0,
  };
  await db.insert(todos).values(newTodo).run();

  return newTodo;
};

export const updateTodo = async (
  db: DrizzleD1Database,
  id: string,
  param: UpdateTodo
): Promise<void> => {
  const todo = await getTodo(db, id);
  if (!todo) {
    return;
  }

  const updatedTodo = {
    ...todo,
    ...param,
  };

  await db
    .update(todos)
    .set({ ...updatedTodo })
    .where(eq(todos.id, id))
    .run();
};

export const deleteTodo = async (
  db: DrizzleD1Database,
  id: string
): Promise<void> => {
  await db.delete(todos).where(eq(todos.id, id)).run();
};
