const {
  register,
  getUserByEmail,
  authenticate,
} = require("../models/auth.models");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError, DuplicationError } = require("../helpers/errors");
require("dotenv").config();

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, username, pin } = req.body;

      // Check if user exist
      const isEmailExist = await getUserByEmail(email);

      if (isEmailExist) {
        throw new DuplicationError("Email already used");
      }

      const salt = 10;
      const hashedPin = await bcyrpt.hash(pin, salt);

      const user = await register(email, username, hashedPin);

      res.success(201, "user created", user.rows[0]);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, pin } = req.body;
      // Check if user exist
      const isUserExist = await getUserByEmail(email);

      if (!isUserExist) {
        throw new NotFoundError("Your email or password incorrect");
      }

      // verify hashed
      const isPinMatch = await bcyrpt.compare(pin, isUserExist.pin);

      if (!isPinMatch) {
        throw new NotFoundError("Your email or password incorrect");
      }

      const payload = {
        id: isUserExist.id,
        username: isUserExist.username,
      };

      // create JWT
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: "30min",
      });

      res.success(200, "login success", token);
    } catch (error) {
      next(error);
    }
  },
  authenticate: async (req, res, next) => {
    try {
      const user_id = req.user.id;

      const user = await authenticate(user_id);

      res.status(200).json({
        status: true,
        message: "success",
        data: user.rows,
      });

      res.success(200, "authenticate success", user.rows);
    } catch (error) {
      next(error);
    }
  },
};
