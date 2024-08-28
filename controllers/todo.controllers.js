const { NotFoundError, UnauthorizedError } = require("../helpers/errors");
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
    throw new NotFoundError("Todo not found");
  }

  const user_id_from_todo = todo.rows[0].user_id;
  if (user_id_from_todo !== user_id) {
    throw new UnauthorizedError("You cannot access this resource");
  }

  return todo;
};

module.exports = {
  get: async (req, res, next) => {
    try {
      const user_id = req.user.id;
      const results = await get(user_id);

      res.success(200, "success", results.rows);
    } catch (error) {
      next(error);
    }
  },
  getByid: async (req, res, next) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;
      const todo = await getTodoById(id, user_id);

      res.success(200, "success", todo.rows[0]);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const user_id = req.user.id;

      const todo = await post(title, description, user_id);

      res.success(201, "todo created", todo.rows);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;

      const { title, description } = req.body;

      const todo = await getTodoById(id, user_id);

      const todo_id = todo.rows[0].id;

      const result = await update(title, description, todo_id);

      res.success(200, "update success", result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
  updateStatus: async (req, res, next) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;

      const todo = await getTodoById(id, user_id);

      const result = await updateStatus(todo.rows[0].id);

      res.success(200, "status complete updated", result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
  softDelete: async (req, res, next) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;
      const todo = await getTodoById(id, user_id);

      const result = await softDelete(todo.rows[0].id);

      res.success(200, "status delete updated", result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
  hardDelete: async (req, res, next) => {
    try {
      const id = req.params.todo_id;
      const user_id = req.user.id;
      const todo = await getTodoById(id, user_id);

      await hardDelete(todo.rows[0].id);

      res.success(200, "todo deleted", null);
    } catch (error) {
      next(error);
    }
  },
};
