const Joi = require("joi");

async function validateinput(req, res, next) {
  const { username, password, lastname, firstname, email } = req.body;
  var schema = Joi.object().keys({
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
    lastname: Joi.string().invalid("undefined").min(1).required(),
    firstname: Joi.string().invalid("undefined").min(1).required(),
    email: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    username: username,
    password: password,
    lastname: lastname,
    firstname: firstname,
    email: email,
  };
  const validationresult = await schema.validate(dataToValidate);
  if (validationresult.error == null) {
    next();
  } else {
    res.json({ status: "invalid" });
  }
}

module.exports = {
  validateinput: validateinput,
};
