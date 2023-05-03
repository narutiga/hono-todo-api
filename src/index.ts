import { Hono } from "hono";
import { Env } from "./bindings";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => c.text("Hello Hono!🔥"));

export default app;
