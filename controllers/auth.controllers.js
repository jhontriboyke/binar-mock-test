const {
  register,
  getUserByEmail,
  authenticate,
} = require("../models/auth.models");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, pin } = req.body;

      // Check if user exist
      const isEmailExist = await getUserByEmail(email);

      if (isEmailExist) {
        return res.status(400).json({
          status: false,
          message: "Email already used",
        });
      }

      const salt = 10;
      const hashedPin = await bcyrpt.hash(pin, salt);

      const user = await register(email, username, hashedPin);

      res.status(200).json({
        status: true,
        message: "user created",
        data: user.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, pin } = req.body;
      // Check if user exist
      const isUserExist = await getUserByEmail(email);

      if (!isUserExist) {
        throw new Error("Email incorrect");
      }

      // verify hashed
      const isPinMatch = await bcyrpt.compare(pin, isUserExist.pin);

      if (!isPinMatch) {
        throw new Error("Password incorrect");
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

      res.status(200).json({
        status: true,
        message: "success",
        data: token,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  },
  authenticate: async (req, res) => {
    try {
      const user_id = req.user.id;

      const user = await authenticate(user_id);

      res.status(200).json({
        status: true,
        message: "success",
        data: user.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  },
};
