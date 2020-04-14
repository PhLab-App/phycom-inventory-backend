const MysqlService = require("../database/mysql-service");

/**
 * Creates a role
 * @param {string} roleName Name of the role
 */
async function createRole(roleName) {
  const role = await MysqlService.createData("Role", { name: roleName });
  return role;
}

module.exports = {
  createRole,
};
