const Joi = require('joi');

const OnboardingSchema = Joi.object({
  blood_group: Joi.string().required(),
  genotype: Joi.string().required(),
  sugar_level: Joi.string().required(),
  height: Joi.string().required(),
  weight: Joi.string().required(),
  user_id: Joi.string().required(),
});



const validateOnboardingData = async (data) => {
  let { error, value } = await OnboardingSchema.validateAsync(data);
   return { err: error, value };
};


module.exports = { validateOnboardingData }