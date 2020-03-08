const AuthenticationService = require("../authentication/authentication-service");
const UsersService = require("./users-service");

/**
 * @param {object} payloadData
 * @param {string} payloadData.name
 * @param {string} payloadData.lastName
 * @param {string} payloadData.email
 * @param {string} payloadData.password Hashed password
 * @param {string} payloadData.status
 * @param {string} payloadData.identification
 * @param {object} userData Data from the user who is making the request
 * @param {number} userData.id
 */
async function register(payloadData, userData) {
  try {
    const userExists = await UsersService.getUserByEmail(payloadData.email);
    if (userExists) {
      return Promise.reject({
        status: 400,
        message: "User already exists",
      });
    }

    payloadData.password = AuthenticationService.hashPassword(payloadData.password);
    payloadData.registered_by = userData.id;
    const user = await UsersService.createUser(payloadData);

    return user;
  } catch (error) {
    global.winstonLogger.error(error);
    return error;
  }
}

/**
 * @param {object} payloadData
 * @param {string} payloadData.email
 * @param {string} payloadData.password
 */
async function login(payloadData) {
  try {
    const user = await UsersService.getUserByEmail(payloadData.email);
    if (!user) {
      return Promise.reject({
        status: 404,
        message: "User not found",
      });
    }
    const data = user.get({ plain: true });
    const result = await AuthenticationService.comparePassword(user.password, payloadData.password);
    if (!result) {
      return Promise.reject({
        status: 400,
        message: "Passwords don't match",
      });
    }

    const token = AuthenticationService.createToken(user.id, user.email);

    data.token = token;
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.registered_by;

    return Promise.resolve(data);
  } catch (error) {
    global.winstonLogger.error(error);
    return error;
  }
}

module.exports = {
  register,
  login,
};