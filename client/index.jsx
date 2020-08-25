import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./app";

const wrapper = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  wrapper
);
