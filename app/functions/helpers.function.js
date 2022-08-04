'use strict';
const { db, auth, firebase_auth} = require('../utils/db')
const FieldValue = require('firebase-admin').firestore.FieldValue;
const Ads = require('../models/ads.model');
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');

const {user_registration_email_notification} = require('../email_templates/user_email_notifications.js');


//VIEW ALL ADS 
const getUserDetails = async (req, res, next) => {
    try {
        let uid = req.cookies.uid;
        let displayName = req.cookies.displayName;
        let photoURL = req.cookies.photoURL;
        let role = req.cookies.role;
        let email = req.cookies.email;

       // let role = res.locals.role;

        // console.log(role)

        // console.log("imex  --- " + uid)
        // console.log("imex  --- " + displayName)
        // console.log("imex  --- " + photoURL)

        //return uid
   let mydata;
        const companyQuerySnapshot = await db.collection('users')
            .where('email', '==', email)
            .where('role', '==', role)
            .get();
        companyQuerySnapshot.forEach(
            (doc) => {
                mydata = {
                    id: doc.id,
                    uid: uid,
                    displayName: displayName,
                    email: email,
                    role: role,
                    photoURL: doc.data().photo,
                }

            })

            console.log(mydata)

      res.json(mydata)

    } catch (error) {
        res.status(500).send(error);
    }
}



const approvalConfirmed = async (req, res, next) => {
    try {

       

            //CHECK ROLES AND PERMISSION // Only Super Admin and Admin can Approve Users
// Verify the ID token first.
firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken) {
            var user = firebase.auth().currentUser;
            console.log("id token - " + idToken)

            if (user) {
auth.verifyIdToken(idToken)
.then((claims) => {
  let role = claims.super_admin 
  console.log("Role - ",role)
if (role === true) {

    const id = req.params.id;
    let uname;
    let email;
    let password;
    let usession;

      db.collection('users')
        .where('user_id', '==', id)
        .get()
        .then(async function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                 email = doc.data().email;
                 uname = doc.data().fullname;
                 password = doc.data().password;
                 usession = doc.data().session;
                })
        if(usession == "enabled")
        {
            const saltRounds = 10;
            try {  

              const approvedAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

                auth.createUser({
                    email: email,
                    emailVerified: false,
                    password:password,
                    displayName:uname,
                    disabled: false
                   }).then((user) => {
                   // console.log("Successfully created new user:", userRecord.uid);
                   // Add custom claims
                    auth.setCustomUserClaims(user.uid, {role: 'Admin'})
                    .then(() => {
                    console.log(user);
                   // console.log(user.customClaims['admin']);

                    })
                    //add data to database
                    var data = {
                        role: "Admin",
                        company_id: user.uid,
                        approval_status: "Approved",
                        approvedAt:approvedAt
                        //Whatever data you would like to add for this user
                    };
                      db.collection('users').doc(id)
                      .set(data,{merge:true})
                     .then(()=>{

                        user_registration_email_notification(email, uname, res, req);
                     
                     }).catch((error)=>{
                         err = {
                            message: `Failed to send user notification email ${error.message}`,
                        };
                        handleResError(res, err, res.statusCode)
                     })
                   

                })


            } catch(e){
                console.log(e)
                handleResError(res, e, res.statusCode)
            }

}else{
    err = {
        message: 'User Alredy Exist!',
    };
    handleResError(res, err, res.statusCode)
}

})
//}

    }else{
            
    err = {
        message: 'You are not authorized to perform this function.',
    };
    handleResError(res, err, res.statusCode)

    }

})
}
})
        
    } catch (e) {
       
        handleResError(res, e, res.statusCode)
    }

}

const approvalReversed = async (req, res, next) => {
    try {
        if (req.cookies.uid) {
            const { id, uid } = req.body;
            
            const message = "";
            auth.updateUser(uid, { disabled: true })
            .then(()=>{ 
                  const updateUser = db.collection('users').doc(id);
                        updateUser.set({
                            session: "disabled",
                            approval_status: "UnApproved"
                 }, { merge: true })
              
              
                handleResSuccess(res, 'success', '', res.statusCode)

            }).catch((error)=>{
                err = {
                    message: error.message,
                };
                handleResError(res, err, res.statusCode)

            })
        }
    } catch (e) {
        handleResError(res, e, res.statusCode)
    }

}


module.exports = { 
  getUserDetails,
  approvalConfirmed,
  approvalReversed
}