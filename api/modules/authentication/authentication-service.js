const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const messages = require("../../utils/messages/index");

const SECRET = process.env.JWT_SECRET;

/**
  * Crea un hash de la contrasenna usando bcrypt
  * @param {String} plainTextPassword Password in plain text
  * @return {String}
  */
function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  return bcrypt.hashSync(plainTextPassword, saltRounds);
}

/**
  * Usa la librer'ia bcrypt para comparar 2 contrasennas
  * @param {String} passwordDB Hash de contrasenna almacenada en DB
  * @param {String} passwordEntered Contrasenna ingresada en plain text por el usuario
  * @return {Promise<Boolean>}
  */
async function comparePassword(passwordDB, passwordEntered) {
  return bcrypt.compare(passwordEntered, passwordDB);
}

/**
  * Crea un jsonwebtoken con ciertos datos del usuario
  * @param {Number} id
  * @param {String} email
  * @param {String} rol
  * @param {number} sessionID
  * @return {String}
  */
function createToken(id, email, rol, sessionID) {
  const payload = {
    id,
    email,
    rol,
    sessionID,
  };
  return jwt.sign(payload, SECRET);
}

/**
  * Obtiene el payload codificado en un token
  * @param {String} token Token a decodificar
  */
function decodeToken(token) {
  return jwt.verify(token, SECRET);
}

function verifyToken(token) {
  try {
    if (!token) {
      return Promise.reject({
        status: 401,
        message: messages.MISSING_AUTH_TOKEN,
      });
    }
    return decodeToken(token);
  } catch (error) {
    if (error.message === "jwt malformed") {
      return Promise.reject({
        status: 403,
        message: messages.BAD_TOKEN,
      });
    } else {
      return Promise.reject({
        message: error,
      });
    }
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  decodeToken,
  verifyToken,
};
