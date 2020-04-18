const RolesController = require("./roles-controller");
const { validateRole } = require("../authentication/authentication-middleware");
const { AUTHENTICATION } = require("../../../constants");

module.exports = (app, responses) => {
  app.route("/roles")
    .post(validateRole(AUTHENTICATION.ONLY_ADMIN), async (req, res, next) => {
      try {
        const data = await RolesController.createRole(req.body.name);
        return responses.success(res, null, null, data);
      } catch (error) {
        next(error);
      }
    });
};
