'use strict';
const { db, bucket} = require('../utils/db')
const FieldValue = require('firebase-admin').firestore.FieldValue;
const Ads = require('../models/ads.model');
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');



//VIEW ALL ADS 
const showAllEntities = async (req, res, next) => {
        let err;

    try {
        const ads = await db.collection('ads');
        const data = await ads.get();
        const adsArray = [];
        if(data.empty) {
             err = {
                    message: "No Ad record found",
              };
              handleResError(res, err, res.statusCode);     

        }else {
            data.forEach(doc => {
                const ad = new Ads(
                    doc.id,
                    doc.data().name,
                    doc.data().details,
                    doc.data().reservationtime,
                    doc.data().ad_package,
                    doc.data().initial_cost,
                    doc.data().duration,
                    doc.data().location,
                    doc.data().displays,
                    doc.data().amount,
                );
                adsArray.push(ad);
            });
          handleResSuccess(res, "Ads Fetched Successfully", adsArray, res.statusCode);  

        }
    } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}



module.exports = { 
  showAllEntities
}