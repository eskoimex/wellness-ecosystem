'use strict';
const { handleResError } = require("../../utils/err.util");
const { showAllEntities } = require("../../functions/entity.function");



const readEntities = async (req, res, next) => {    
  try { 
       let { err, value } = await validateAdsData(req.body);
       if (err) handleResError(res, err, res.statusCode);
        await showAllEntities(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};


module.exports = {
    readEntities
}