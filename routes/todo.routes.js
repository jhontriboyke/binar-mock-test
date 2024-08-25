const router = require("express").Router();
const {
  get,
  post,
  getByid,
  update,
  updateStatus,
  softDelete,
  hardDelete,
} = require("../controllers/todo.controllers");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/", authenticateToken, get);

router.get("/:todo_id", authenticateToken, getByid);

router.post("/", authenticateToken, post);

// update todo title & description
router.put("/:todo_id", authenticateToken, update);

// update todo status completed
router.patch("/:todo_id/update", authenticateToken, updateStatus);

// soft delete todo / change is_deleted to true
router.patch("/:todo_id/delete", authenticateToken, softDelete);

// hard delete from database
router.delete("/:todo_id", authenticateToken, hardDelete);

module.exports = router;
