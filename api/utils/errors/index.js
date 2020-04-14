const Sequelize = require("sequelize");

class DatabaseError extends Error {
  constructor(message, type, statusCode){
    super(message);
    this.type = type;
    this.message = message;
    this.status = statusCode;
  }
}

/**
 * Process the error thrown by a sequelize operation.
 * Returns a human readable error
 * @param {Sequelize.BaseError} error
 * @return {DatabaseError}
 */
const sequelizeErrorHandler = error => {
  if (error instanceof(Sequelize.ValidationError)) {
    const message = parseSequelizeError(error);
    throw new DatabaseError(message, "ValidationError", 400);
  } else {
    console.error(error);
    throw new DatabaseError(error.message, "DatabaseError", 400);
  }
}

/** Returns the first error message sent by Sequelize */
const parseSequelizeError = error => {
  let message = "";
  const messages = error.message.split(",");
  const firstMessage = messages[0];
  if (firstMessage && firstMessage !== "") {
    const temp = firstMessage.split(": ");
    if (temp.length > 0) {
      message = temp[1];
    }
  }
  return message;
};

module.exports = {
  sequelizeErrorHandler,
};
