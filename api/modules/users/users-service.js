const userModel = "User";
const RolesService = require("../roles/roles-service");

async function getUserByEmail(email) {
  return global.databases.Mysql.db[userModel].findOne({
    where: {
      email,
    },
  });
}

/**
 * 
 * @param {object} userData
 * @param {string} userData.name
 * @param {string} userData.lastName
 * @param {string} userData.email
 * @param {string} userData.password Hashed password
 * @param {string} userData.status
 * @param {string} userData.identification
 * @param {number} userData.registered_by ID from the user who created this user
 */
async function createUser(userData) {
  const role = await RolesService.getRoleByName(userData.role);
  if (!role) {
    return Promise.reject({
      status: 400,
      message: "Role does not exist",
    });
  }
  const user = await global.databases.Mysql.db[userModel].create(userData);
  role.addUser(user);
  return user;
}

module.exports = {
  getUserByEmail,
  createUser,
};
