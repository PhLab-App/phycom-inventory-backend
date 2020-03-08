const UsersController = require("../users/users-controller");

module.exports = (app, responses) => {
  app.route("/login")
    .post(async (req, res) => {
      try {
        const user = await UsersController.login(req.body);
        return responses.success(res, null, null, user);
      } catch (error) {
        global.winstonLogger.error(error);
        return responses.error(res, error.status, error.message);
      }
    });
};