import { Hono } from "hono";
import { todos } from "./todos";
import { Env } from "./bindings";

const app = new Hono<{ Bindings: Env }>();

app.route("/api/todos", todos);

export default app;
