const express = require("express");
const app = express();

const responses = require("../utils/responses");
const AuthenticationMiddleware = require("./authentication/authentication-middleware");

require("./authentication")(app, responses);

app.use(AuthenticationMiddleware.validateToken);

require("./roles")(app, responses);
require("./users")(app, responses);
require("./items")(app, responses);
require("./admin")(app, responses);
require("./loans")(app, responses);

module.exports = app;
