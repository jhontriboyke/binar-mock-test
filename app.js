const express = require("express");
const app = express();
require("dotenv").config();
const responseFormat = require("./middlewares/response-format.middleware");

app.use(responseFormat);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
      <div>
        <h1>Welcome to Homepage</h1>
        <p>Go to <a href="./auth/register">register</a> to create new user</p>
        <p>Go to <a href="./auth/login">login</a> to login</p>
        <p>Go to <a href="./todos">todos</a> to access todos</p>
      </div>
    `);
});

const TODO_ROUTES = require("./routes/todo.routes");
const AUTH_ROUTES = require("./routes/auth.routes");
app.use("/auth", AUTH_ROUTES);
app.use("/todos", TODO_ROUTES);

const errorHandler = require("./middlewares/error-handler.middleware");

app.use(errorHandler);

const PORT = process.env.PORT || 8001;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
