const responseFormat = (req, res, next) => {
  res.success = (statusCode = 200, message, data = null) => {
    res.status(statusCode).json({
      status: true,
      message: message,
      data: data,
    });
  };

  res.error = (statusCode, message, data = null) => {
    res.status(statusCode).json({
      status: false,
      message: message,
      data: data,
    });
  };

  next();
};

module.exports = responseFormat;
