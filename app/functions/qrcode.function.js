'use strict';
const { db, bucket} = require('../utils/db')
const FieldValue = require('firebase-admin').firestore.FieldValue;
const QRCode = require('../models/qrcode.model');
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');


// Upload endpoint to send file to Firebase storage bucket

//CREATE
const qrcodeCreate = async (req, res, next) => {
  try {
    if(req.cookies.uid){
      let uid = req.cookies.uid;
      let err;         

          // get form data from from front end.
          const destination_url = req.body.destination_url;
          const qrcode_url = req.body.base64qrcodeurl;
          const createdAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')
          const status="Active";
          const user_id= uid;

          let qrData = {destination_url, qrcode_url, createdAt, status, user_id}

          
          db.collection("qrcodes").doc().set(qrData)
          .then(()=>{
             handleResSuccess(res, "success", qrData, res.statusCode); 
              }).catch((error)=>{
                err = {
                  message: error,
            };
            handleResError(res, err, res.statusCode);     
        })
      }
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
};



//VIEW ALL ADS 
const qrcodeViewAll = async (req, res, next) => {
        let err;

    try {
        const qrcode = await db.collection('qrcodes');
        const data = await qrcode.get();
        const qrcodeArray = [];
        if(data.empty) {
             err = {
                    message: "No QRCode record found",
              };
              handleResError(res, err, res.statusCode);     

        }else {
            data.forEach(doc => {
                const qr_code = new QRCode(
                    doc.id,
                    doc.data().url,
                );
                qrcodeArray.push(qr_code);
            });
          handleResSuccess(res, "QRcodes Fetched Successfully", qrcodeArray, res.statusCode);  

        }
    } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}



const qrcodeViewByUser = async (req, res, next) => {
    let err;

    try {
      if(req.cookies.uid){
        let uid = res.cookies.uid
        const qrcodeSnapshot = await db.collection('qrcodes')
                                   .where("user_id", "==", uid)
                                   .get();
             
        let qrcodeArray = [];        
              qrcodeSnapshot.forEach((doc) => {
                qrcodeArray.push({
                  id: doc.id,
                  data: doc.data()
                });

              });
            
          handleResSuccess(res, "QRCode Fetched Successfully", qrcodeArray, res.statusCode);  
            }
    } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}

//VIEW AD BY ID
const qrcodeViewById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const qrcode = await db.collection('qrcodes').doc(id);
        const data = await qrcode.get();
        if(!data.exists) {
             err = {
                    message: "QRCode with the given ID not found",
              };
              handleResError(res, err, res.statusCode); 
        }else {
          const qrcodeData = data.data()
          handleResSuccess(res, "QRCode Fetched Successfully", qrcodeData, res.statusCode);  
        }
    } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}



const qrcodeDelete = async (req, res, next) => {
    try {
        //const id = req.params.id;
        if(req.cookies.uid){
          let uid = req.cookies.uid;
          const id = req.body.id;
          await db.collection('qrcodes').doc(id).delete().then(()=>{

                handleResSuccess(res,"success", id, res.statusCode);        
            
          })
      }
   } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}



module.exports = { 
  qrcodeCreate, 
  qrcodeViewAll, 
  qrcodeViewByUser, 
  qrcodeViewById,
  qrcodeDelete,
}