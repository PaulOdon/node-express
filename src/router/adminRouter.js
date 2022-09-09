const express = require("express");
const sessions = require("../data/sessions.json");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");

const adminRouter = express.Router();

adminRouter.get("/").get((req, res) => {
  const url = "mongodb://dbUser:mdp@mongodbname";
  const dbName = "db_name";
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to mongo db");

      const db = client.db(dbName);

      const response = await db.collectin("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  });
});

module.exports = adminRouter;
