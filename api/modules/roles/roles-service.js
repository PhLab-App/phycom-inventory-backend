const RoleModel = "Role";

/** 
 * @param {string} roleName Name of the role to get
 */
async function getRoleByName(roleName) {
  const roleQuery = { name: roleName };
  return global.databases.Mysql.db[RoleModel].findOne({ where: roleQuery });
}

/** 
 * @param {string} roleName Name of the role to create
 */
async function createRole(roleName) {
  const data = { name: roleName };
  return global.databases.Mysql.db[RoleModel].create(data);
}

module.exports = {
  getRoleByName,
  createRole,
};
