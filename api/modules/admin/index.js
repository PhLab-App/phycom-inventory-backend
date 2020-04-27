const { getUsers } = require("./admin-controller");
const { validateRole } = require("../authentication/authentication-middleware");
const { AUTHENTICATION } = require("../../../constants");

module.exports = (app, responses) => {
  app.route("/admin/getUsers")
    .get(validateRole(AUTHENTICATION.ONLY_ADMIN), async(req, res, next) => {
      try {
        const data = await getUsers(req.query);
        return responses.success(res, null, null, data);
      } catch (error) {
        next(error);
      }
    });
};
