const { NotFoundError } = require("../helpers/errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.error(err.statusCode, err.message, err.data);
  }
  // Default
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Internal Error";
  res.error(statusCode, message, null);
};

module.exports = errorHandler;
