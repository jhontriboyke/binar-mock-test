const {
  get,
  getById,
  post,
  update,
  updateStatus,
  softDelete,
  hardDelete,
} = require("../models/todo.models");

const getTodoById = async (id, user_id) => {
  const todo = await getById(id);

  if (todo.rows.length === 0) {
    throw new Error("Todo not found");
  }

  const user_id_from_todo = todo.rows[0].user_id;
  if (user_id_from_todo !== user_id) {
    throw new Error("You cannot access this resource");
  }

  return todo;
};

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
      const user_id = req.user.id;
      const todo = await getTodoById(id, user_id);

      res.status(200).json({
        status: true,
        message: "success",
        data: todo.rows[0],
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
  update: async (req, res) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;

      const { title, description } = req.body;

      const todo = await getTodoById(id, user_id);

      const todo_id = todo.rows[0].id;

      const result = await update(title, description, todo_id);

      res.status(200).json({
        status: true,
        message: "update success",
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
  updateStatus: async (req, res) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;

      const todo = await getTodoById(id, user_id);

      const result = await updateStatus(todo.rows[0].id);

      res.status(200).json({
        status: true,
        message: "status complete updated",
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
  softDelete: async (req, res) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;
      const todo = await getTodoById(id, user_id);

      const result = await softDelete(todo.rows[0].id);

      res.status(200).json({
        status: true,
        message: "status delete updated",
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
  hardDelete: async (req, res) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;
      const todo = await getTodoById(id, user_id);

      await hardDelete(todo.rows[0].id);

      res.status(200).json({
        status: true,
        message: "todo deleted",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
        data: [],
      });
    }
  },
};
