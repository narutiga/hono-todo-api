import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./bindings";
import { todos } from "./api/todos";

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000",
    maxAge: 600,
    credentials: true,
  })
);

app.route("/api/todos", todos);

export default app;
