const db = require("../config/db/database");

module.exports = {
  register: async (email, username, pin) => {
    try {
      return await db.query(
        "INSERT INTO users (email, username, pin) VALUES ($1, $2, $3) RETURNING *",
        [email, username, pin]
      );
    } catch (error) {
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const user = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      return user.rows[0];
    } catch (error) {
      throw error;
    }
  },
  authenticate: async (user_id) => {
    try {
      return await db.query(
        "SELECT id, email, username FROM users WHERE id = $1",
        [user_id]
      );
    } catch (error) {
      throw error;
    }
  },
};
