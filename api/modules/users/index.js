const UsersController = require("./users-controller");
const { validateRole } = require("../authentication/authentication-middleware");
const { AUTHENTICATION } = require("../../../constants");

module.exports = (app, responses) => {
  app.route("/users/register")
    .post(validateRole(AUTHENTICATION.ONLY_ADMIN), async(req, res, next) => {
      try {
        const user = await UsersController.register(req.body, req.userData);
        return responses.success(res, null, null, user);
      } catch (error) {
        next(error);
      }
    });
  
  app.route("/logout")
    .post(async (req, res, next) => {
      try {
        const user = await UsersController.logout(req.userData);
        return responses.success(res, null, null, user);
      } catch (error) {
        next(error);
      }
    });

  app.route("/users/getUserData")
    .get(async(req, res, next) => {
      try {
        const user = await UsersController.getUserData(req.userData);
        return responses.success(res, null, null, user);
      } catch (error) {
        next(error);
      }
    });
};
