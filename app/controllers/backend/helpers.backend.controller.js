'use strict';
const { handleResError } = require("../../utils/err.util");
const { getUserDetails, approvalConfirmed, approvalReversed } = require("../../functions/helpers.function");


const userDetails = async (req, res, next) => {    
  try { 
        await getUserDetails(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};

const confirmApproval = async (req, res, next) => {    
      try { 
            await approvalConfirmed(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
};

const withdrawApproval = async (req, res, next) => {    
      try { 
            await approvalReversed(req,res);
      } catch (e) {
            handleResError(res, e, res.statusCode);
      }
    };


module.exports = {
    userDetails,
    confirmApproval,
    withdrawApproval
}