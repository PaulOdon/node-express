const express = require("express");
const sessions = require("../data/sessions.json");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");

const adminRouter = express.Router();
const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

adminRouter.route("/").get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("Connected to mongo db");

      const db = client.db(dbName);

      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = adminRouter;
