const Joi = require("joi");

const createTodoSchema = Joi.object().keys({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
});

const updateTodoSchema = Joi.object().keys({
  title: Joi.string().min(3),
  description: Joi.string(),
});

const createTodoValidation = (req, res, next) => {
  const { error } = createTodoSchema.validate(req.body);

  if (!error) {
    return next();
  }

  const { details } = error;

  return res.status(400).json({
    status: false,
    message: details[0].message.replace(),
    data: details[0].path[0],
  });
};

const updateTodoValidation = (req, res, next) => {
  const { error } = updateTodoSchema.validate(req.body);

  if (!error) {
    return next();
  }

  const { details } = error;

  return res.status(400).json({
    status: false,
    message: details[0].message.replace(),
    data: details[0].path[0],
  });
};

module.exports = { createTodoValidation, updateTodoValidation };
