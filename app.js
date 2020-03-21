const serverApp = async () => {
  const express = require("express");
  const bodyParser = require("body-parser");
  const morgan = require("morgan");

  const cors = require("cors");

  global.winstonLogger = require("./api/utils/logger/logger");
  // global.messages = require("./api_v2/utils/messages/");

  const app = express();
  const server = require("http").Server(app);
  const PORT = process.env.PORT || "8000";

  app.use(cors());
  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

  app.use(morgan(":date[iso] - [API] :method :url :status - [RES-TIME] :total-time[3][ms]"));

  // Database connection
  global.databases = require("./db");
  await global.databases.Mysql.connect();

  const api = require("./api/modules/index.js");
  app.use("/api", api);

  app.set("port", PORT);
  return { app, server };
};

module.exports = {
  serverApp,
};
