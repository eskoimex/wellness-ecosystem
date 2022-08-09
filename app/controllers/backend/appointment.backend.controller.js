'use strict';
const { handleResError } = require("../../utils/err.util");
const { bookUserAppointment } = require("../../functions/onboarding.function");
// const {
//       validateOnboardingData,
//     } = require('../../validators/onboarding.validator');


const userAppointment = async (req, res, next) => {    
  try { 
      //  let { err, value } = await validateOnboardingData(req.body);
      //  if (err) handleResError(res, err, res.statusCode);
        await bookUserAppointment(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};


module.exports = {
    userAppointment
}