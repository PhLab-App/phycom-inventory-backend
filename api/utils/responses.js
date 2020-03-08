/**
 * @param {number} status
 * @param {string} message
 */
module.exports.success = (res, status, message, data) => {
  status = status || 200;
  message = message || "OK";
  
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * @param {number} status
 * @param {string} message
 */
module.exports.error = (res, status, message) => {
  status = status || 500;
  message = message || "Server error.";

  return res.status(status).json({
    status,
    message,
  });
};
