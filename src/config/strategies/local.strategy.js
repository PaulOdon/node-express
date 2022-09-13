const { MongoClient } = require("mongodb");
const passport = require("passport");
const { Strategy } = require("passport-local");
const debug = require("debug")("app:localStrategy");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url = process.env.DB_URL;
        const dbName = process.env.DB_NAME;

        (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug("Connected to the mongo db");

            const db = client.db(dbName);

            const user = await db.collection("users").findOne({ username });

            console.log("fetched user ", user);

            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          await client.close();
        })();
      }
    )
  );
};
