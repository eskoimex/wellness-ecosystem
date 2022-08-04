const Joi = require('joi');

const RegistrationSchema = Joi.object({
  firstname: Joi.string().min(2).max(40).required(),
  lastname: Joi.string().min(2).max(40).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  password: Joi.string().required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    // .pattern(
    //   new RegExp(
    //     /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$#!%*?&.]{8,40}/
    //   ),
    //   {
    //     name:
    //       "At least one uppercase, one lowercase, one special character and minimum of 8 characters, maximum of 40 characters",
    //   }
    // )
    .required(),
});



const validateRegistrationData = async (data) => {
  let { error, value } = await RegistrationSchema.validateAsync(data);
   return { err: error, value };
};

const validateLoginData = async (data) => {
  let { error, value } = await LoginSchema.validate(data);
  return { err: error, value };
};

module.exports = { validateRegistrationData, validateLoginData }