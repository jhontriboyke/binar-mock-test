const router = require("express").Router();
const { get } = require("../controllers/todo.controllers");

router.get("/", get);

router.get("/:id", (req, res) => {
  res.send("Specific todo by id " + req.params.id);
});

module.exports = router;
