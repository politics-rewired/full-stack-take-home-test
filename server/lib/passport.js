import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import { db } from "./db";

export const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (username, password, done) => {
    db("users")
      .where({ email: username })
      .first()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Unknown email." });
        }

        const hash = user.auth0_id.split("|")[1];
        bcrypt.compare(password, hash, function (err, result) {
          if (err) return done(null, false, { message: err.message });

          if (!result)
            return done(null, false, { message: "Incorrect password." });

          return done(null, user);
        });
      })
      .catch((err) => {
        return done(err);
      });
  }
);
