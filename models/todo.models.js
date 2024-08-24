const db = require("../config/db/database");

module.exports = {
  get: async (user_id) => {
    return await db.query(
      "SELECT id, title, description FROM todos WHERE user_id = $1",
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
};
