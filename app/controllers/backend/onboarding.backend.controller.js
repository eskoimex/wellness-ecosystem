'use strict';
const { handleResError } = require("../../utils/err.util");
const { onBoardUser } = require("../../functions/onboarding.function");
const {
      validateOnboardingData,
    } = require('../../validators/onboarding.validator');


const userOnboarding = async (req, res, next) => {    
  try { 
       let { err, value } = await validateOnboardingData(req.body);
       if (err) handleResError(res, err, res.statusCode);
        await onBoardUser(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};


module.exports = {
    userOnboarding
}