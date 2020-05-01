const MysqlService = require("../database/mysql-service");
const { USER_STATUSES, LOAN_STATUSES } = require("../../../constants");

/**
 * @param {object} payloadData
 * @param {string|Date} payloadData.startDate
 * @param {string|Date} payloadData.endDate
 * @param {string} payloadData.description
 * @param {object[]} payloadData.items List of items to loan
 * @param {number} payloadData.items.id ID of the item to loan
 * @param {number} payloadData.items.name
 * @param {number} payloadData.items.quantity
 * @param {object} userData Data from the user who is making the request
 * @param {number} userData.id
 */
async function register(payloadData, userData) {
  // Validations
  const query = { id: userData.id };
  const user = await MysqlService.getFirstMatch("User", query);
  if (!user) {
    return Promise.reject({
      status: 400,
      message: global.messages.USER_NOT_FOUND,
    });
  }
  if (user.status !== USER_STATUSES.ACTIVE) {
    return Promise.reject({
      status: 400,
      message: global.messages.USER_NOT_ACTIVE,
    });
  }

  const itemsQuery = {
    id: {
      $or: payloadData.items.map(item => item.id),
    },
  };
  const attributes = ["total", "on_loan", "id"];
  const items = await MysqlService.getData("Item", itemsQuery, attributes, {});
  for (const item of payloadData.items) {
    const dbItem = items.find(x => x.id === item.id);

    if (!dbItem) {
      return Promise.reject({ status: 404, message: `${item.name} does not exist.` });
    }
    const available = dbItem.get("total") - dbItem.get("on_loan");
    if (available < item.quantity) {
      return Promise.reject({ status: 400, message: `Not enough items in stock for ${item.name}` });
    }
  }

  // Create loan
  payloadData.registered_by = userData.id;
  payloadData.status = LOAN_STATUSES[0];
  const loan = await MysqlService.createData("Loan", payloadData);

  // Create loan status update
  const loanStatus = {
    loan_id: loan.get("id"),
    status: LOAN_STATUSES[0],
    registered_by: userData.id,
  };
  await MysqlService.createData("LoanStatusUpdate", loanStatus);

  // Create loan items list
  const loanItems = payloadData.items.map(item => {
    return {
      quantity: item.quantity,
      item_id: item.id,
      loan_id: loan.id,
    };
  });
  await MysqlService.bulkCreate("LoanItem", loanItems);

  // Increase onLoan values of items
  for (const item of payloadData.items) {
    const dbItem = items.find(x => x.id === item.id);
    const itemCriteria = { id: item.id };
    const itemUpdate = {
      onLoan: (dbItem.get("on_loan") + item.quantity),
    };
    await MysqlService.updateData("Item", itemCriteria, itemUpdate);
  }

  return loan;
}

module.exports = {
  register,
};
