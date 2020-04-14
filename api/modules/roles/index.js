const RolesController = require("./roles-controller");

module.exports = (app, responses) => {
  app.route("/roles")
    .post(async (req, res, next) => {
      try {
        const data = await RolesController.createRole(req.body.name);
        return responses.success(res, null, null, data);
      } catch (error) {
        next(error);
      }
    });
};
