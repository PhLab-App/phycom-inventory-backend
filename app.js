const serverApp = async () => {
  const express       = require("express");
  const bodyParser    = require("body-parser");
  const morgan        = require("morgan");

  const cors = require("cors");

  const fs = require("fs");
  // const path = require("path");

  global.winstonLogger = require("./api/utils/logger/logger");
  // global.messages = require("./api_v2/utils/messages/");

  const app    = express();
  const server = require("http").Server(app);
  const PORT   = process.env.PORT || "8000";

  app.use(cors());
  // Body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

  if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
  } else {
    app.use(morgan("dev"));
  }

  // Database connection
  const databases = require("./db");
  const mysqlDB = await databases.Mysql.connect();

  // /* Get config files */
  // let configs = {};
  // try {
  //   const re = /(?:-config.js)+/gm;
  //   const source = './api_v2/modules/';
  //   fs.readdirSync(source).map(name => {
  //     const fullName = path.join(source, name);
  //     const isDir = fs.lstatSync(fullName).isDirectory();
  //     if (isDir) {
  //       fs.readdirSync(fullName).map(name => {
  //         if (re.test(name)) {
  //           const moduleName = name.split('-')[0];
  //           configs[moduleName] = require(path.resolve('./', fullName, name));
  //         }
  //       });
  //     }
  //   });
  // } catch (error) {
  //   global.winstonLogger.error(error);
  // }
  // global.configs = configs;

  // /* Get controller files */
  // let controllers = {};
  // try {
  //   const re = /(?:-controller.js)+/gm;
  //   const source = './api_v2/modules/';
  //   fs.readdirSync(source).map(name => {
  //     const fullName = path.join(source, name);
  //     const isDir = fs.lstatSync(fullName).isDirectory();
  //     if (isDir) {
  //       fs.readdirSync(fullName).map(name => {
  //         if (re.test(name)) {
  //           const controllerName = capitalizeFirstLetter(name.split('-')[0]) + 'Controller';
  //           controllers[controllerName] = require(path.resolve('./', fullName, name));
  //         }
  //       });
  //     }
  //   });
  // } catch (error) {
  //   global.winstonLogger.error(error);
  // }
  // global.controllers = controllers;

  // /* Connect to DB */
  // const dbUrl = process.env[`DB_URL_${process.env.NODE_ENV.toUpperCase()}`]
  // let MongoService = require('./api_v2/modules/database-services/mongo-service');
  // let db = await MongoService.connect(dbUrl);

  // global.MongoService = MongoService;

  // const api = require('./api_v2/modules/api-router');
  // app.use('/api', api);

  // const client = express()
  // require('./client/client.server')(client)
  // app.use('/', client)

  app.set("port", PORT);
  return { app, server };
};

module.exports = {
  serverApp,
};


// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
