const router = require("express").Router();
const {
  register,
  login,
  authenticate,
} = require("../controllers/auth.controllers");
const authenticateToken = require("../middlewares/auth.middleware");
const authValidation = require("../middlewares/validations/auth-validation.middleware");

router.post("/login", authValidation, login);

router.post("/register", authValidation, register);

router.post("/authenticate", authenticateToken, authenticate);

module.exports = router;
