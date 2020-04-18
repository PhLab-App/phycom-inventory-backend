const AuthenticationService = require("./authentication-service");
const messages = require("../../utils/messages/index");

/**
 * Middleware validation for token authentication
 * @param {object} req HTTP request object from
 * @param {object} req.headers
 * @param {object} res
 * @param {function} next
 */
const validateToken = async (req, _res, next) => {
  try {
    const token = req.headers["x-access-token"];
    req.userData = await AuthenticationService.verifyToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware validation for user role
 * @param {number[]} roles Valid roles
 */
const validateRole = roles => {
  const isAllowed = role => roles.indexOf(role) > -1;

  // eslint-disable-next-line no-unused-vars
  return (req, _res, next) => {
    if (isAllowed(req.userData.rol)) {
      next();
    } else {
      next({ status: 401, message: messages.UNAUTHORIZED });
    }
  };
};


module.exports = {
  validateToken,
  validateRole,
};
