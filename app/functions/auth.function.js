'use strict';
const { db, auth, firebase_auth} = require('../utils/db')
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
var randomString = require('random-string');

const { emailVerificationLink } = require("../utils/emailTemplate/userEmailNotification.util");

const registerUser = async (req, res, next) => {
 let err; 
  try { 

        //Retrieve user details from frontned
        const {firstname, lastname, email, phone_number, password} = req.body;
   console.log(req.body)
        const createdAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

        //encrypt / hash password
        const saltRounds = 10;
        await bcrypt.hash(password,saltRounds,(error,hash)=>{ 
        const fullname = firstname+" "+lastname;
        let emailVerificationTtoken =  randomString({length: 32, special: false});

                    // create user account-
                    auth.createUser({
                        email: email,
                        password:password,
                        displayName:fullname,
                       }).then((userDetails) => {

                        // Add custom claims or roles
                        auth.setCustomUserClaims(userDetails.uid, {role: "User"})
                        .then(() => {
                            let uuid = userDetails.uid;
                              db.collection('users').doc(uuid)
                                        .set({
                                        firstname: firstname,
                                        lastname: lastname,
                                        email: email,
                                        phone_number: phone_number,
                                        password: hash,
                                        role: "User",
                                        createdAt: createdAt,
                                        user_id: uuid,
                                        isEmailVerified: false
                                }).then( async () => {

                                    const data = {
                                        user_id: uuid,
                                        token: emailVerificationTtoken
                                      }

                                      await db.collection('verification_token').add(data)
                                  
                                 
                                          let user = userDetails.toJSON();
                                          emailVerificationLink(emailVerificationTtoken, user.email, fullname, user, res, req)

                                          //handleResSuccess(res, "success", user, res.statusCode);  
                                    }).catch((error)=>{
                                                console.log(error.message)
                                                err = {
                                                         message: error.message,
                                                };
                                                handleResError(res, err, res.statusCode);
                                      })                                   
                        })
                    }).catch((error)=>{
                            console.log(error.message)
                          // returns error related to signup e.g User Already exist e.t.c
                            err = {
                                    message: error.message,
                            };
                            handleResError(res, err, 400);
                      })
                })
    } catch (e) {
       console.log(e)
      handleResError(res, e, res.statusCode);
    }

};


//EMAIL VERIFICATION
const verifyEmail = async (req, res, next) => {
    let err;
    try {
       let email = req.query.email
       console.log(email)
      db.collection("users").where("email", "==", email)
      .get()
        .then( async user => {
              //////CHECK IF EMAIL IS VERIFIED/////
                if (user.isEmailVerified) {
                    err= {
                      message : 'This email is already verified!'
                    }
                    handleResError(res, err, res.statusCode); 
  
                } else {
                      //////CHECK IF LINK IS VALID/////
               
                    // db.collection("users").where("email", "==", email)
                    //     .get()
                    //    .then(user => {
                          if (!user) {
                            err= {
                                message : `Invalid link - ${user} ${email}`
                              }
                              handleResError(res, err, res.statusCode); 
                              return;
                          }
                        //   return;
                       // })
  
  
                 
                    
                    db.collection("verification_token")
                    .where("user_id", "==", user.uid)
                    .where("token", "==",  req.query.token)
                    .get()
                    .then(token => {
                      if (!token) {
                        err= {
                            message : 'Invalid Token'
                          }
                          handleResError(res, err, res.statusCode); 
                      }
                      return;
                    })
  
                    //UPDATE isEmailVerified TO TRUE
                 
                   await db.collection("verification_token")
                    .where("token", "==",  req.query.token)
                    .get()
                      .then( async (foundToken) => {
                        if(foundToken){

                           let id = foundToken.user_id
                           console.log("id", id) 

                          let dataUpdate = {isEmailVerified: true}
                        //   await User.update(data1 ,{
                        //            where: {email: email}
                        // });

                          await db.collection('users').doc(cid)
                                      .update({dataUpdate})
        
                        let user_token = {token : foundToken.token}
                        handleResSuccess(res,`User with ${user.email} is successfully verified` , user_token, res.statusCode);
  
                         // DELETE TOKEN AFTER VERIFICATION AND UPDATE isVerified to false///
                        //  await VerificationToken.destroy({
                        //   where: {token : req.query.token}
                        // })
                        await db.collection('verification_token').doc(id).delete();

  
                          } else {
                            err= {
                              message : 'No Token found for this user!'
                            }
                            handleResError(res, err, res.statusCode); 
                          }
                      })
                      .catch(error => {
                          err= {
                            message : `Invalid Token! ${error.message}`
                          }
                          handleResError(res, err, res.statusCode);
                      });
  
            }
            }).catch((error) => {
    
              err = {
                message : `User does not exist. ${error.message}.`
              };
              handleResError(res, err, res.statusCode);
                
        });
    
    } catch (error) {
      err = {
        message: `Error when trying send email: ${error.message}`,
      };
       handleResError(res, err, res.statusCode);
    }
  };
  
  


const loginUser = async (req, res, next) => {
    try {
        //Get the field values
       // const createdAt = Date.now();
       let err;

          const loggedInAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

            const { email, password } = req.body;
            const data = {
                email,
                password,
                loggedInAt
            }
                db.collection("users").where("email", "==", email)
                .get()
                    .then(function (querySnapshot) 
                 {
                    let hashed_password;

                        querySnapshot.forEach(function (doc) {
                            hashed_password = doc.data().password
                        })
                            console.log(hashed_password)
                            console.log(password)
                                if(hashed_password == "undefined"){
                                    
                                    err = {
                                        message: "User with this credentials does not exist.",
                                    };
                                    handleResError(res, err, res.statusCode)

                                }
                                else {
                                            let check = bcrypt.compareSync(password, hashed_password)
            if (check) {   
                // firebase_auth.signInWithEmailAndPassword(email,hashed_password)

                 firebase_auth.signInWithEmailAndPassword(email, password)
                        .then(function () {
                            firebase_auth.currentUser.getIdToken(true)
                                .then(function (idToken) {
                                    console.log(idToken)
                                    var user = firebase_auth.currentUser;
                                    console.log(user.displayName)
                                    if (user) {
                                        
                                        auth.verifyIdToken(idToken)
                                        
                                                .then(function (decodedToken) {

                                                    
                                                        if (decodedToken.uid === user.uid) {
                                                            
                                                            req.user = user.uid
                                                            let uid = user.uid
                                                            let displayName = user.displayName
                                                            let photoURL = user.photoURL
                                                            console.log(uid + " " + displayName + " " + email  + " " + photoURL)
                                                            res.cookie("uid", uid,{maxAge: 3600000});
                                                            res.cookie("displayName", displayName);
                                                            res.cookie("photoURL", photoURL);
                                                            res.cookie("email", email);
                                                            res.cookie("role", decodedToken.role);
                                                            res.locals.role = decodedToken.role;

                                                         let user_role = decodedToken.role
                                                            console.log(user_role)   

                                                            handleResSuccess(res, 'success', idToken, res.statusCode)

                                                        }
                                                }).catch(function (error) {
                                                    //Handle error
                                                    err = {
                                                        message: error.message,
                                                    };
                                                    handleResError(res, err, res.statusCode)

                                                });
                                    } else {
                                        err = {
                                            message: error.message,
                                        };
                                        handleResError(res, err, res.statusCode)
                                    }

                             }).catch(function (error) {
                                err = {
                                    message: error.message,
                                };
                                handleResError(res, err, res.statusCode)

                                        })

                            })
                            .catch(function (error) {
                            
                                
                                err = {
                                    message: error.message ,
                                };
                                handleResError(res, err, res.statusCode)                                                                                                            })
                        }
                        else{
                        
                            err = {
                                message: "User with this credentials does not exist."
                            };
                            handleResError(res, err, res.statusCode)

                }
            }
        })
    }
    catch (e) {
       
        handleResError(res, e, res.statusCode)    
    }
    
}





    




module.exports = { registerUser, verifyEmail, loginUser}