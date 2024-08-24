const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      throw new Error("Authorization header not found");
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
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = authenticateToken;
