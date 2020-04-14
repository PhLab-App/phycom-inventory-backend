const userModel = "User";
const RolesService = require("../roles/roles-service");
const errorService = require("../../utils/errors/index");

/**
 * Find an user by its email
 * @param {string} email
 */
async function getUserByEmail(email) {
  return global.databases.Mysql.db[userModel].findOne({
    where: {
      email,
    },
  })
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

/**
 * Create the register of an user in the database and assigns a role
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
  return RolesService.getRoleByName(userData.role)
    .then(role => {
      if (!role) {
        return Promise.reject({ status: 400, message: "Role does not exist" });
      }
      return global.databases.Mysql.db[userModel].create(userData)
        .then(user => {
          role.addUser(user);
          return user;
        });
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

module.exports = {
  getUserByEmail,
  createUser,
};
