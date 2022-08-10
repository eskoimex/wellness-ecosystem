'use strict';
const { db } = require('../utils/db')
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');
const { sendPatientTestDetails } = require("../utils/emailTemplate/userEmailNotification.util");


const bookUserAppointment = async (req, res, next) => {
  try {
   
        const email = req.body.email;
        const name = req.body.name;
        const physician = req.body.physician;
        const date = req.body.date;
        const time = req.body.time;
        const user_id= req.body.id;

        let appointment_data = {email, name, physician, date, time, user_id}

        
        db.collection("appointment").doc().set(appointment_data)
        .then(async()=>{
          
          handleResSuccess(res, "success", appointment_data, res.statusCode); 


            }).catch((error)=>{
              err = {
                message: error,
          };
          handleResError(res, err, res.statusCode);     
      })
 
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
};


const confirmAppointment = async (req, res, next) => {
  try {
    let email = req.query.email
    let name = req.query.name;
          let dataUpdate = {isAppointmentApproved: true}
          await db.collection('users').doc(user_id)
              .update(dataUpdate).then(()=>{
                 sendPatientTestDetails(email, name, res, req) 

              })
              .catch((error)=>{
              err = {
                message: error,
          };
          handleResError(res, err, res.statusCode);     
      })
    
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
};


const viewAppointments = async (req, res, next) => {
  let err;

try {
    
      const companyQuerySnapshot = await db.collection('appointment')
          .get();
      const user = [];
      companyQuerySnapshot.forEach(
          (doc) => {
            let id  = doc.id
              user.push({
                  id, ...doc.data()
              });
          }
      );
      handleResSuccess(res, "success", user, res.statusCode);  

} catch (e) {
 handleResError(res, e, res.statusCode);
}
}


const viewAppointmentById = async (req, res, next) => {
  let err;

  try {
      let uid = req.params.id
      const appointmentSnapshot = await db.collection('appointment')
        .where("user_id", "==", uid)
        .get();
      let appointmentArray = [];
      appointmentSnapshot.forEach((doc) => {
        let id = doc.id
        appointmentArray.push({
          id, ...doc.data()
        });
      });

      handleResSuccess(res, "success", appointmentArray, res.statusCode);
  
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
}


module.exports = { 
  bookUserAppointment,
  confirmAppointment,
  viewAppointments,
  viewAppointmentById
}