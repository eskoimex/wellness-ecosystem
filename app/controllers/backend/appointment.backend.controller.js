'use strict';
const { handleResError } = require("../../utils/err.util");
const { bookUserAppointment, confirmAppointment, viewAppointments, viewAppointmentById } = require("../../functions/appointment.function");
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

const confirmUserAppointment = async (req, res, next) => {    
  try { 
      //  let { err, value } = await validateOnboardingData(req.body);
      //  if (err) handleResError(res, err, res.statusCode);
        await confirmAppointment(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};


const viewUsersAppointments = async (req, res, next) => {    
  try { 
      //  let { err, value } = await validateOnboardingData(req.body);
      //  if (err) handleResError(res, err, res.statusCode);
        await viewAppointments(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};


const viewUserAppointment = async (req, res, next) => {    
  try { 
      //  let { err, value } = await validateOnboardingData(req.body);
      //  if (err) handleResError(res, err, res.statusCode);
        await viewAppointmentById(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};
module.exports = {
    userAppointment,
    confirmUserAppointment,
    viewUsersAppointments,
    viewUserAppointment
}