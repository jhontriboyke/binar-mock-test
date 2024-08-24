const router = require("express").Router();
const {
  register,
  login,
  authenticate,
} = require("../controllers/auth.controllers");
const authenticateToken = require("../middlewares/auth.middleware");

router.post("/login", login);

router.post("/register", register);

router.post("/authenticate", authenticateToken, authenticate);

module.exports = router;
