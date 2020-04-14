const UsersController = require("../users/users-controller");

module.exports = (app, responses) => {
  app.route("/login")
    .post(async (req, res, next) => {
      try {
        req.body.ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const user = await UsersController.login(req.body);
        return responses.success(res, null, null, user);
      } catch (error) {
        next(error);
      }
    });
};