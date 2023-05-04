/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from "hono/jsx";
import { Layout } from "./Layout";
import { Todo } from "../api/todos/model";

const Form = () => {
  return (
    <form action="/post" method="POST">
      <label>
        Title:
        <input name="title" />
      </label>
      <input type="submit" />
    </form>
  );
};

export const Top = (props: { todos: Todo[] }) => {
  return (
    <Layout>
      <h1>🔥Hono Todo</h1>
      <Form />
      <ul>
        {props.todos.map((todo) => {
          const checked = todo.completed === 0 ? false : true;
          return (
            <li>
              <input type="checkbox" checked={checked} />
              <p>{todo.title}</p>
              <button>編集</button>
              <button>削除</button>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};
