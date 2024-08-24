const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const TODO_ROUTES = require("./routes/todo.routes");
const AUTH_ROUTES = require("./routes/auth.routes");
app.use("/todos", TODO_ROUTES);
app.use("/auth", AUTH_ROUTES);

const PORT = process.env.SERVER_PORT || 8001;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
