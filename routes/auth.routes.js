const router = require("express").Router();
const {
  register,
  login,
  authenticate,
} = require("../controllers/auth.controllers");
const authenticateToken = require("../middlewares/auth.middleware");
const {
  createUserValidation,
  loginUserValidation,
} = require("../middlewares/validations/auth-validation.middleware");

router.post("/login", loginUserValidation, login);

router.post("/register", createUserValidation, register);

router.post("/authenticate", authenticateToken, authenticate);

module.exports = router;
