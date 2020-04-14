const ItemsService = require("./items-service");

/**
 * Creates an item in the database
 * @param {object} payloadData
 * @param {string} payloadData.name
 * @param {string} payloadData.model
 * @param {string} payloadData.description
 * @param {string} payloadData.image
 * @param {string} payloadData.status
 * @param {number} payloadData.total
 * @param {object} userData Data from the user who is making the request
 * @param {number} userData.id
 */
async function createItem(payloadData, userData) {
  payloadData.registered_by = userData.id;
  return ItemsService.createItem(payloadData);
}

/**
 * Returns all the items that match the query
 * @param {object} queryData
 * @param {number} queryData.limit Number of results to show
 * @param {number} queryData.skip Number of results to skip
 * @param {string} queryData.searchText Search items by name and model
 * @param {string} queryData.orderBy Field by which the search will be ordered
 * @param {string} queryData.orderDirection Direction for the order: ASC - DESC
 */
async function getItems(queryData) {
  const options = {
    limit: queryData.limit ? queryData.limit : 12,
    skip: queryData.skip ? queryData.skip : 0,
  };
  const query = {};
  if (queryData.searchText && queryData.searchText !== "") {
    query.$or = {
      name: {
        $like: `%${queryData.searchText}%`,
      },
      model: {
        $like: `%${queryData.searchText}%`,
      },
    };
  }
  if ( queryData.orderBy && queryData.orderBy !== "" && queryData.orderDirection && queryData.orderDirection !== "") {
    options.order = [queryData.orderBy, queryData.orderDirection];
  }
  const data = await ItemsService.getItems(query, [], options);
  const total = await ItemsService.countItems(query);

  return { data, total };
}

async function updateItem(payloadData) {
  const query = {
    id: Number(payloadData.itemID),
  };
  const update = Object.assign({}, payloadData);
  delete update.itemID;

  const result = await ItemsService.updateItem(query, update);
  if (!result) {
    return Promise.reject({
      status: 404,
      message: global.messages.ITEM_NOT_FOUND,
    });
  }
  return result;
}

module.exports = {
  createItem,
  getItems,
  updateItem,
};
