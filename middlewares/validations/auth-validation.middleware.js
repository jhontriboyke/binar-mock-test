const Joi = require("joi");

const authSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  pin: Joi.string().length(6).required(),
});

const authValidation = (req, res, next) => {
  const { error } = authSchema.validate(req.body);

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

module.exports = authValidation;
