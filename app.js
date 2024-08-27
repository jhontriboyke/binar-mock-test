const express = require("express");
const app = express();
require("dotenv").config();
const responseFormat = require("./middlewares/response-format.middleware");

app.use(responseFormat);
app.use(express.json());

const TODO_ROUTES = require("./routes/todo.routes");
const AUTH_ROUTES = require("./routes/auth.routes");
app.use("/auth", AUTH_ROUTES);
app.use("/todos", TODO_ROUTES);

const errorHandler = require("./middlewares/error-handler.middleware");

app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 8001;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
