const express = require("express");
const debug = require("debug")("app:authRouter");
const { MongoClient } = require("mongodb");
const passport = require("passport");

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  const url = process.env.DB_URL;
  const dbName = process.env.DB_NAME;

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);

      req.logIn(results, () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureRedirect: "/",
    })
  );

authRouter.route("/profile").get((req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = authRouter;
