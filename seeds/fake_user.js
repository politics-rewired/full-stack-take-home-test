const bcrypt = require("bcrypt");

const myPlaintextPassword = "Foobar22";
const saltRounds = 10;

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
    })
    .then(function (hash) {
      return knex("users").insert([
        {
          name: "George Harrison",
          email: "me@politicsrewired.com",
          auth0_id: "local|" + hash,
        },
      ]);
    });
};
