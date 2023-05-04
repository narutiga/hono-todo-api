/** @jsx jsx */
/** @jsxFrag  Fragment */
import { jsx } from "hono/jsx";

export const Layout = (props: { children?: string }) => {
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
};
