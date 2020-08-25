import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";
import path from "path";

import { env } from "./config";
import { strategy } from "./lib/passport";

// Passport setup
passport.use(strategy);
passport.serializeUser((user, done) => {
  const { auth0_id, created_at, updated_at, ...safeUser } = user;
  done(null, safeUser);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// API
const api = express.Router();
api.get("/session", (req, res) => res.send({ foo: "bar" }));
api.post(
  "/session",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

// Express app
const cookieConfig = {
  cookie: {
    httpOnly: true,
    secure: env.isProduction,
    maxAge: null,
  },
  secret: env.SESSION_SECRET,
};
const app = express();
app.use(express.static("dist/client"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession(cookieConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", api);

// Return web application for any unrecognized path
app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

// Boot it up!
app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});
