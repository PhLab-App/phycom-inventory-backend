const itemModel = "Item";
const errorService = require("../../utils/errors/index");

/**
 * Create the register of an item in the database
 * @param {object} payloadData
 * @param {string} payloadData.name
 * @param {string} payloadData.model
 * @param {string} payloadData.description
 * @param {string} payloadData.image
 * @param {string} payloadData.status
 * @param {number} payloadData.total
 * @param {number} payloadData.onLoan
 * @param {string} payloadData.userEmail
 */
async function createItem(payloadData) {
  return global.databases.Mysql.db[itemModel].create(payloadData)
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

/**
 * Query items from the database
 * @param {object} query
 * @param {string[]} attributes
 * @param {object} options
 * @param {number} options.limit
 * @param {number} options.skip
 * @param {string[]} options.order
 */
async function getItems(query, attributes, options) {
  const order = (options.order) ? [options.order] : [];
  return global.databases.Mysql.db[itemModel].findAll({
    where: query,
    order,
    // attributes,
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
 * Count the number of items that match the query
 * @param {object} query
 */
async function countItems(query) {
  return global.databases.Mysql.db[itemModel].count({ where: query })
    .then(result => {
      return result;
    })
    .catch(error => {
      return errorService.sequelizeErrorHandler(error);
    });
}

async function updateItem(query, update) {
  const item = await global.databases.Mysql.db[itemModel].findOne({
    where: query,
  });
  if (item) {
    return item.update(update)
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

module.exports = {
  createItem,
  getItems,
  countItems,
  updateItem,
};
