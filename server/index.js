import express from "express";
import path from "path";

import { apolloServer } from "./api/graphql";

const app = express();

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.get("/test", (req, res) => {
  res.json({ hello: "world" });
});

app.use(express.static("dist/client"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
