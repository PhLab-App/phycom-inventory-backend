const { validateRole } = require("../authentication/authentication-middleware");
const { AUTHENTICATION } = require("../../../constants");

const LoansController = require("./loans-controller");

module.exports = (app, responses) => {

  app.route("/loans/register")
    .post(validateRole(AUTHENTICATION.ALL), async(req, res, next) => {
      try {
        const data = await LoansController.register(req.body, req.userData);
        return responses.success(res, null, null, data);
      } catch (error) {
        next(error);
      }
    });

};
