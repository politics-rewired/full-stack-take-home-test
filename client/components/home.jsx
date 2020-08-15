import React from "react";
import { Link } from "react-router-dom";

export const Home = (props) => (
  <div>
    <Link to="/login" style={{ float: "right" }}>
      Login
    </Link>
    <h1>Take Home Test</h1>
    <p>Please see README.md for instructions.</p>
  </div>
);
