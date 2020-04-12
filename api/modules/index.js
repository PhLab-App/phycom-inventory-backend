const express = require("express");
const app = express();

const responses = require("../utils/responses");
const AuthenticationService = require("./authentication/authentication-service");

require("./authentication")(app, responses);
require("./roles")(app);

app.use(async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    req.userData = await AuthenticationService.verifyToken(token);
    next();
  } catch(error) {
    responses.error(res, error.status, error.message);
  }
});

require("./users")(app, responses);
require("./items")(app, responses);

module.exports = app;