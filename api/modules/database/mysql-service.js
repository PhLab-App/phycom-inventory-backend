const databases = require("../../../db");
const errorService = require("../../utils/errors/index");

/**
 * Create a register in the database
 * @param {string} modelName Name of the sequelize model
 * @param {object} data Data to create
 */
async function createData(modelName, data) {
  return databases.Mysql.db[modelName].create(data)
    .then(result => {
      return result;
    })
    .catch(err => {
      return errorService.sequelizeErrorHandler(err);
    });
}

/**
 * Return registers from the database that match the query
 * @param {string} modelName Name of the sequelize model
 * @param {object} query
 * @param {string[]} attributes
 * @param {object} options
 * @param {number} options.limit
 * @param {number} options.skip
 * @param {string[]} options.order
 */
async function getData(modelName, query, attributes, options) {
  const order = (options.order) ? [options.order] : [];
  return databases.Mysql.db[modelName].findAll({
    where: query,
    order,
    attributes,
    offset: Number(options.skip),
    limit: Number(options.limit),
  })
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

/**
 * Returns the first register from the database that matches the query
 * @param {string} modelName Name of the sequelize model
 * @param {object} query
 * @param {string[]} attributes
 */
async function getFirstMatch(modelName, query, attributes) {
  return databases.Mysql.db[modelName].findOne({
    where: query,
    attributes,
  })
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

/**
 * Count the number of registers that match the query
 * @param {string} modelName Name of the sequelize model
 * @param {object} query
 */
async function countData(modelName, query) {
  return databases.Mysql.db[modelName].count({ where: query })
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

/**
 * Updates a register in the database
 * @param {string} modelName Name of the sequelize model
 * @param {object} query Query to find the register to update
 * @param {object} data Data to update
 */
async function updateData(modelName, query, data) {
  const register = await getFirstMatch(modelName, query, null);
  if (register) {
    return register.update(data)
      .then(result => {
        return result;
      })
      .catch(error => {
        return errorService.sequelizeErrorHandler(error);
      });
  } else {
    return null;
  }
}

async function deleteData(modelName, query) {
  return databases.Mysql.db[modelName].destroy({
    where: query,
  })
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

/**
 * 
 * @param {string} modelName Name of the sequelize model
 * @param {object} query
 * @param {string[]} attributes
 * @param {object} populate
 * @param {string} populate.modelName
 * @param {string[]} populate.attributes
 */
async function getFirstMatchPopulate(modelName, query, attributes, populate) {
  return databases.Mysql.db[modelName].findOne({
    where: query,
    attributes,
    include: [{
      model: databases.Mysql.db[populate.modelName],
      attributes: populate.attributes,
    }],
  })
}

module.exports = {
  createData,
  getData,
  countData,
  updateData,
  getFirstMatch,
  deleteData,
  getFirstMatchPopulate,
};
