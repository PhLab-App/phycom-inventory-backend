const UsersController = require("./users-controller");

module.exports = (app, responses) => {
  app.route("/users/register")
    .post(async(req, res) => {
      try {
        const user = await UsersController.register(req.body, req.userData);
        return responses.success(res, null, null, user);
      } catch (error) {
        global.winstonLogger.error(error);
        return responses.error(res, error.status, error.message);
      }
    });
};
