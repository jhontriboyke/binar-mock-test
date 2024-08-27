const jwt = require("jsonwebtoken");
const { UnauthorizedError, ValidationError } = require("../helpers/errors");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      throw new UnauthorizedError("Authorization header not found");
    }

    const token = header.split(" ")[1];

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      // verify JTW token
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

      const user = jwt.verify(token, JWT_SECRET_KEY);

      req.user = user;
      next();
    } catch (error) {
      throw new ValidationError(error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateToken;
