import React from "react";
import { Link } from "react-router-dom";

export const Login = () => (
  <div>
    <Link to="/" style={{ float: "right" }}>
      Home
    </Link>
    <h1>Login</h1>
    <form action="/api/session" method="post">
      Email:
      <input name="email" type="email" />
      <br />
      Password:
      <input name="password" type="password" />
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
);
