const { get, getById } = require("../models/todo.models");

module.exports = {
  get: async (req, res) => {
    try {
      const results = await get();

      res.status(200).json({
        status: true,
        message: "success",
        data: results,
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
