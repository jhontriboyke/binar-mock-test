const errorHandler = (err, res, req) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Internal Error";

  res.status(statusCode).json({
    status: false,
    message: message,
  });
};

module.exports = errorHandler;
