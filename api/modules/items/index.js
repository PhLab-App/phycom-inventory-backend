const ItemsController = require("./items-controller");
const { validateRole } = require("../authentication/authentication-middleware");
const { AUTHENTICATION } = require("../../../constants");

module.exports = (app, responses) => {

  app.route("/items/createItem")
    .post(validateRole(AUTHENTICATION.ONLY_ADMIN), async(req, res, next) => {
      try {
        const user = await ItemsController.createItem(req.body, req.userData);
        return responses.success(res, null, null, user);
      } catch (error) {
        next(error);
      }
    });
  
  app.route("/items/getItems")
    .get(validateRole(AUTHENTICATION.ALL), async(req, res, next) => {
      try {
        const user = await ItemsController.getItems(req.query);
        return responses.success(res, null, null, user);
      } catch (error) {
        next(error);
      }
    });

  app.route("/items/updateItem")
    .put(validateRole(AUTHENTICATION.ONLY_ADMIN), async(req, res, next) => {
      try {
        const data = await ItemsController.updateItem(req.body);
        return responses.success(res, null, null, data);
      } catch (error) {
        next(error);
      }
    });
};
