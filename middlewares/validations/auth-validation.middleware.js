const Joi = require("joi");

const createUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(16).required(),
  pin: Joi.string().length(6).required(),
});

const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  pin: Joi.string().length(6).required(),
});

const createUserValidation = (req, res, next) => {
  const { error } = createUserSchema.validate(req.body);

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

const loginUserValidation = (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);

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

module.exports = {
  createUserValidation,
  loginUserValidation,
};
