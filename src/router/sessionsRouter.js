const express = require("express");
const debug = require("debug")("app:sessionsRouter");
const { MongoClient, ObjectID } = require("mongodb");

const sessionsRouter = express.Router();
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

sessionsRouter.use((req, res, next) => {
  if (req.user) next();
  else res.redirect("/auth/signin");
});

sessionsRouter.route("/").get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to mongo db");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to mongo db");

      const db = client.db(dbName);

      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectID(id) });
      res.render("session", { session });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = sessionsRouter;
