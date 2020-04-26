const MysqlService = require("../database/mysql-service");

/**
 * Returns all the users that match the query
 * @param {object} queryData
 * @param {number} queryData.limit Number of results to show
 * @param {number} queryData.skip Number of results to skip
 * @param {string} queryData.searchText Search items by name and model
 * @param {string} queryData.orderBy Field by which the search will be ordered
 * @param {string} queryData.orderDirection Direction for the order: ASC - DESC
 */
async function getUsers(queryData) {
    const options = {
      limit: queryData.limit ? queryData.limit : 12,
      skip: queryData.skip ? queryData.skip : 0,
    };
    if ( queryData.orderBy && queryData.orderBy !== "" && queryData.orderDirection && queryData.orderDirection !== "") {
      options.order = [queryData.orderBy, queryData.orderDirection];
    }
  
    const query = {};
    if (queryData.searchText && queryData.searchText !== "") {
      query.$or = {
        name: {
          $like: `%${queryData.searchText}%`,
        },
        lastName: {
          $like: `%${queryData.searchText}%`,
        },
        email: {
          $like: `%${queryData.searchText}%`,
        },
      };
    }
  
    const attributes = ["name", "lastName", "email", "status", "identification"];
    const populate = { modelName: "Role", attributes: ["name"] };
    const promises = await Promise.all([
      MysqlService.getDataPopulate("User", query, attributes, options, populate),
      MysqlService.countData("User", query),
    ]);
    const data = promises[0];
    const total = promises[1];
  
    return { data, total };
  }

  module.exports = {
    getUsers,
  };
  