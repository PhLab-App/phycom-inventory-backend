const sessionModel = "Session";

/**
 * @param {object} payloadData
 * @param {string} payloadData.ip
 * @param {*} user
 */
async function createSession(payloadData, user) {
  const session = await global.databases.Mysql.db[sessionModel].create(payloadData);
  session.setUser(user);
  return session;
}

/**
 * @param {string} ip
 * @param {number} userID
 */
async function getSession(ip, userID) {
  return global.databases.Mysql.db[sessionModel].findOne({
    where: {
      ip,
      user_id: userID,
    },
  });
}

/**
 * @param {number} sessionID
 */
async function destroySession(sessionID) {
  return global.databases.Mysql.db[sessionModel].destroy({
    where: {
      id: sessionID,
    },
  });
}

module.exports = {
  createSession,
  getSession,
  destroySession,
};
