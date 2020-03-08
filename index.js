process.on("uncaughtException", err => {
  console.error(`Caught exception: ${JSON.stringify(err)}`);
  console.error(err.stack);
});

const init = async () => {
  try {
    const { serverApp } = require("./app");
    let { server, app } = await serverApp();

    const onError = (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }
      const port = process.env.PORT;
      const bind = typeof port === "string"
        ? `Pipe ${port}`
        : `Port ${port}`;
      switch (error.code) {
      case "EACCES":
        global.winstonLogger.error(`${bind} correr en otro puerto, este puerto requiere permisos de root`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        global.winstonLogger.error(`${bind} el puerto ya esta en uso client`);
        process.exit(1);
        break;
      default:
        throw error;
      }
    };

    const onListening = () => {
      const addr = server.address();
      const bind = typeof addr === "string"
        ? `Pipe ${addr}`
        : `Port ${addr.port}`;
      if (process.env.NODE_ENV !== "testing") {
        global.winstonLogger.info(`Server general corriendo en  ${bind}`);
      }
    };

    server.on("error", onError);
    server.on("listening", onListening);
    server.listen(app.get("port"));
  } catch (error) {
    global.winstonLogger.error(error);
  }
};

init();
