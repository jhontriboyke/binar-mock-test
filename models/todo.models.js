const db = require("../config/db/database");

module.exports = {
  get: async () => {
    return await db.query("SELECT * FROM todos");
  },
  getById: async (id) => {
    return await db.query("SELECT * FROM todos WHERE id = $1", [id]);
  },
};
