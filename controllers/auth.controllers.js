const { register, getUserByEmail } = require("../models/auth.models");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, pin } = req.body;

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
};
