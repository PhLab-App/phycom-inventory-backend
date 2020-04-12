const ItemsController = require("./items-controller");

module.exports = (app, responses) => {
  app.route("/items/createItem")
    .post(async(req, res) => {
      try {
        const user = await ItemsController.createItem(req.body, req.userData);
        return responses.success(res, null, null, user);
      } catch (error) {
        global.winstonLogger.error(error);
        return responses.error(res, error.status, error.message);
      }
    });

  app.route("/items/getItems")
    .get(async(req, res) => {
      try {
        const user = await ItemsController.getItems(req.query);
        return responses.success(res, null, null, user);
      } catch (error) {
        global.winstonLogger.error(error);
        return responses.error(res, error.status, error.message);
      }
    });

  app.route("/items/updateItem")
    .put(async(req, res) => {
      try {
        const data = await ItemsController.updateItem(req.body);
        return responses.success(res, null, null, data);
      } catch (error) {
        global.winstonLogger.error(error);
        return responses.error(res, error.status, error.message);
      }
    });
};
