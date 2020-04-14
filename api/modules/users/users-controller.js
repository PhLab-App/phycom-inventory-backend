const AuthenticationService = require("../authentication/authentication-service");
const UsersService = require("./users-service");
const SessionsController = require("../sessions/sessions-controller");

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
  const userExists = await UsersService.getUserByEmail(payloadData.email);
  if (userExists) {
    return Promise.reject({
      status: 400,
      message: global.messages.USER_ALREADY_EXISTS,
    });
  }

  payloadData.password = AuthenticationService.hashPassword(payloadData.password);
  payloadData.registered_by = userData.id;
  return UsersService.createUser(payloadData);
}

/**
 * @param {object} payloadData
 * @param {string} payloadData.email
 * @param {string} payloadData.password
 */
async function login(payloadData) {
  // Find user
  const user = await UsersService.getUserByEmail(payloadData.email);
  if (!user) {
    return Promise.reject({
      status: 404,
      message: global.messages.USER_NOT_FOUND,
    });
  }
  const data = user.get({ plain: true });
  const result = await AuthenticationService.comparePassword(user.password, payloadData.password);
  if (!result) {
    return Promise.reject({
      status: 400,
      message: global.messages.INCORRECT_PASSWORD,
    });
  }
  // Create session
  const sessionData = {
    ip: payloadData.ip,
    userID: user.id,
    user,
  };
  let session = await SessionsController.sessionManager(sessionData);
  session = session.get({ plain: true });
  // Create token
  const token = AuthenticationService.createToken(user.id, user.email, data.roleId, session.id);
  // Parse data
  data.token = token;
  delete data.password;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.registered_by;

  return data;
}

/**
 * Deletes the user's session
 * @param {object} userData
 * @param {number} userData.sessionID
 */
async function logout(userData) {
  await SessionsController.expireSession(userData);
  return true;
}

module.exports = {
  register,
  login,
  logout,
};
