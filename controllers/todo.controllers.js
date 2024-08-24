const { get, getById, post } = require("../models/todo.models");

module.exports = {
  get: async (req, res) => {
    try {
      const user_id = req.user.id;
      const results = await get(user_id);

      res.status(200).json({
        status: true,
        message: "success",
        data: results.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        data: [],
      });
    }
  },
  getByid: async (req, res) => {
    try {
      const id = req.params.todo_id;

      const result = await getById(id);

      const user_id_from_token = req.user.id;
      const user_id_from_todo = result.rows[0].user_id;
      if (user_id_from_todo !== user_id_from_token) {
        throw new Error("You cannot access this resource");
      }

      res.status(200).json({
        status: true,
        message: "success",
        data: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: [],
      });
    }
  },
  post: async (req, res) => {
    try {
      const { title, description } = req.body;
      const user_id = req.user.id;

      const todo = await post(title, description, user_id);

      res.status(201).json({
        status: true,
        message: "todo created",
        data: todo.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "fail",
        data: [],
      });
    }
  },
};
