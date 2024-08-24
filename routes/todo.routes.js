const router = require("express").Router();
const { get, post, getByid } = require("../controllers/todo.controllers");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/", authenticateToken, get);

router.get("/:todo_id", authenticateToken, getByid);

router.post("/", authenticateToken, post);

module.exports = router;
