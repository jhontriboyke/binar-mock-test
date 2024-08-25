const db = require("../config/db/database");

module.exports = {
  get: async (user_id) => {
    return await db.query(
      "SELECT id, title, description, is_completed, is_deleted FROM todos WHERE user_id = $1",
      [user_id]
    );
  },
  getById: async (id) => {
    return await db.query("SELECT * FROM todos WHERE id = $1", [id]);
  },
  post: async (title, description, user_id) => {
    return await db.query(
      "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, user_id]
    );
  },
  update: async (title, description, id) => {
    // get current todo title and description
    const current_todo = await db.query("SELECT * FROM todos WHERE id = $1", [
      id,
    ]);

    if (!title) {
      title = current_todo.rows[0].title;
    }

    if (!description) {
      description = current_todo.rows[0].description;
    }

    return await db.query(
      "UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
  },
  updateStatus: async (id) => {
    const current_todo = await db.query("SELECT * FROM todos WHERE id = $1", [
      id,
    ]);
    return await db.query(
      "UPDATE todos SET is_completed = $1 WHERE id = $2 RETURNING *",
      [!current_todo.rows[0].is_completed, id]
    );
  },
  softDelete: async (id) => {
    const current_todo_delete_status = await db.query(
      "SELECT is_deleted FROM todos WHERE id = $1",
      [id]
    );
    return await db.query(
      "UPDATE todos SET is_deleted = $1 WHERE id = $2 RETURNING *",
      [!current_todo_delete_status.rows[0].is_deleted, id]
    );
  },
  hardDelete: async (id) => {
    return await db.query("DELETE FROM todos WHERE id = $1", [id]);
  },
};
