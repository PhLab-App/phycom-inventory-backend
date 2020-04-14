const UsersController = require("./users-controller");

module.exports = (app, responses) => {
  app.route("/users/register")
    .post(async(req, res, next) => {
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
};
