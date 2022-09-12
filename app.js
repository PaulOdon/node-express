const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const chalk = require("chalk"); // butify some log in the console
const morgan = require("morgan");
const debug = require("debug")("app"); // give details on the log in the console
const path = require("node:path");

const sessionsRouter = require("./src/router/sessionsRouter");
const adminRouter = require("./src/router/adminRouter");
const authRouter = require("./src/router/authRouter");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: "globomantics" }));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "welcome to the node js world",
    data: ["a", "b", "c"],
  });
});

app.listen(PORT, () => {
  debug(`listining on port ${chalk.green(PORT)}`);
});
