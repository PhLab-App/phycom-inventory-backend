const MysqlService = require("../database/mysql-service");

/**
 * @param {object} payloadData
 * @param {string} payloadData.ip
 * @param {number} payloadData.userID
 * @param {*} payloadData.user
 */
async function sessionManager(payloadData) {
  const query = {
    ip: payloadData.ip,
    user_id: payloadData.userID,
  };
  let session = await MysqlService.getFirstMatch("Session", query, null);
  if (!session) {
    session = await MysqlService.createData("Session", payloadData);
    session.setUser(payloadData.user);
  }
  return session;
}

/**
 * @param {object} payloadData
 * @param {number} payloadData.sessionID
 */
async function expireSession(payloadData) {
  const query = { id: payloadData.sessionID };
  return MysqlService.deleteData("Session", query);
}

module.exports = {
  sessionManager,
  expireSession,
};