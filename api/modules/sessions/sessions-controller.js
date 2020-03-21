const SessionsService = require("./sessions-service");

/**
 * @param {object} payloadData
 * @param {string} payloadData.ip
 * @param {number} payloadData.userID
 * @param {*} payloadData.user
 */
async function sessionManager(payloadData) {
  let session = await SessionsService.getSession(payloadData.ip, payloadData.userID);
  if (!session) {
    session = await SessionsService.createSession(payloadData, payloadData.user);
  }
  return session;
}

/**
 * @param {object} payloadData
 * @param {number} payloadData.sessionID
 */
async function expireSession(payloadData) {
  return SessionsService.destroySession(payloadData.sessionID);
}

module.exports = {
  sessionManager,
  expireSession,
};