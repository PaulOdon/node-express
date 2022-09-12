const passport = require("passport");

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());
};
