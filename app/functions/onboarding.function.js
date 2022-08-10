'use strict';
const { db } = require('../utils/db')
//const FieldValue = require('firebase-admin').firestore.FieldValue;
//const Ads = require('../models/ads.model');
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');


const onBoardUser = async (req, res, next) => {
  try {
    // if (req.cookies.uid) {

      let uid = req.cookies.uid;
        // get form data from from front end.
        const blood_group = req.body.blood_group;
        const genotype = req.body.genotype;
        const sugar_level = req.body.sugar_level;
        const height = req.body.height;
        const weight = req.body.weight;

        const createdAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')
        const user_id= uid;

        let healthQuestions = {blood_group, genotype, sugar_level, height, weight, createdAt, user_id}

        
        db.collection("health_questions").doc().set(healthQuestions)
        .then(async()=>{
          
          let dataUpdate = {firstLogin: true}

          await db.collection('users').doc(user_id)
              .update(dataUpdate)
           handleResSuccess(res, "success", healthQuestions, res.statusCode); 
            }).catch((error)=>{
              err = {
                message: error,
          };
          handleResError(res, err, res.statusCode);     
      })
          
        

      // }else{
      //   res.send("Token has expired")
      // }
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
};


module.exports = { 
  onBoardUser
}