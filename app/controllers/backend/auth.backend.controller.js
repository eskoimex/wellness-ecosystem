'use strict';
const { db, auth, firebase_auth} = require('../../utils/db')
const { handleResError } = require("../../utils/err.util");
const { handleResSuccess } = require("../../utils/success.util");

const { registerUser, verifyEmail, loginUser } = require("../../functions/auth.function");
const {
  validateRegistrationData,
  validateLoginData,
} = require('../../validators/auth.validator');
const moment = require('moment');


const userRegistration = async (req, res, next) => {    
  try { 
       let { err, value } = await validateRegistrationData(req.body);
       if (err) handleResError(res, err, res.statusCode);
        await registerUser(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};


const userEmailVerification = async (req, res, next) => {    
  try { 
        await verifyEmail(req,res);
  } catch (e) {
        handleResError(res, e, res.statusCode);
  }
};

const userLogin = async (req, res, next) => {
  try{
    let {err, value} = await validateLoginData(req.body)
    if(err) handleResError(res, err, res.statusCode);
      await loginUser(req,res);
  }catch(e){
   await handleResError(res, e, res.statusCode)
  }

};


const userLogout = async (req, res, next) => {
  // let uid = req.body.uid;
  if (req.cookies.uid) {

  //let uid ="Ow9wX4BqWeOF6oBoyhkooR8uU9s2"
  let uid = req.cookies.uid;
  auth.revokeRefreshTokens(uid)
      .then(() => {
        return auth.getUser(uid);
      })
      .then((userRecord) => {
        return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;

      })
      .then((timestamp) => {
          const timestamp1 = moment.unix(timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
          /////////
                
        // Clear the specified cookies
        if (res.clearCookie('uid')) {
         //handleResSuccess(res, 'User Successfully Logged out.', `logged out at ${timestamp1}`, res.statusCode)
          res.redirect('/login');
        } 

        
    });

  }

}


const resetPassword = async (req, res, next) => {
  let err;
  let userEmail = req.body.email;
  auth.generatePasswordResetLink(userEmail)
    .then((link) => {
      // Construct password reset email template, embed the link and send
      // using custom SMTP server.
      
      handleResSuccess(res, 'Password Reset Link Generated.', link, res.statusCode);

     //return sendCustomPasswordResetEmail(userEmail, displayName, link)
      // .then(()=>{
      //     handleResSuccess(res, 'Password Reset Link Sent.', userEmail, res.statusCode);
      // }).catch((error) => {
      //   // Some error occurred.
      //   err={
      //     message: error.message
      //   }
      //     handleResError(res, err, res.statusCode)

      // })
    })
    .catch((error) => {
      // Some error occurred.
      err={
        message: error.message
      }
         handleResError(res, err, res.statusCode)

    })
  }



// const login = async (req, res) => {
//          try {

//             res.render('pages/login', {
//                 title: "Login Page",
//             });
//         } catch (error) {
//             res.status(500).send(error);
//         }
// }


// const register = async (req, res) => {
//          try {

//             res.render('pages/register', {
//                 title: "Register Page",
//             });
//         } catch (error) {
//             res.status(500).send(error);
//         }
// }


module.exports = { userRegistration, userLogin, userLogout, resetPassword}