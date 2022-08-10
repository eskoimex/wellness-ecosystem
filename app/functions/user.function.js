'use strict';
const { db, auth, firebase, firebase_auth, bucket, admin } = require('../utils/db')
const Users = require('../models/users.model');
const bcrypt = require('bcryptjs');
const { handleResSuccess } = require("../utils/success.util");
const { handleResSuccessAndLog } = require("../utils/successLog.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');


// Upload endpoint to send file to Firebase storage bucket

//VIEW ALL ADS 
const usersViewAll = async (req, res, next) => {
  let err;

// try {
//   const users = await db.collection('users');
//   const data = await users.get();
//   const usersArray = [];
//   if(data.empty) {
//        err = {
//               message: "Users record not found",
//         };
//         handleResError(res, err, res.statusCode);     

//   }else {
//       data.forEach(doc => {
//           const user = new Users(
//               doc.id,
//               doc.data().createdat,
//               doc.data().email,
//               doc.data().fullname,
//               doc.data().last_loggedin,
//           );
//           usersArray.push(user);
//       });
//     handleResSuccess(res, "Users Fetched Successfully", usersArray, res.statusCode);  

//   }
// } catch (e) {
//     handleResError(res, e, res.statusCode);      
//   }
try {
  // if (req.cookies.uid) {
      let uid = req.cookies.uid;
      const message = "";
      // req.flash('success', message)
      //console.log(message)
      const companyQuerySnapshot = await db.collection('users')
          .where('company_id', '==', uid)
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

  // } else {
  //     res.redirect('/login')
  // }
} catch (e) {
  handleResError(res, e, res.statusCode);
}
}


const userViewById = async (req, res, next) => {
  let err;

  try {
    //if (req.cookies.uid) {
      let uid = req.cookies.uid;
      const userSnapshot = await db.collection('users')
        .where("user_id", "==", uid)
        .get();
      let userArray = [];
      userSnapshot.forEach((doc) => {
        let id = doc.id
        userArray.push({
          id, ...doc.data()
        });
      });

      handleResSuccess(res, "User Details Extracted", userArray, res.statusCode);
  //   }   else {
  //     res.redirect('/login')
  // }
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
}


const userUpdate = async (req, res, next) => {
  try {
    if (req.cookies.uid) {
      let uid = req.cookies.uid;

      const data1 = req.body;
      const lastUpdated = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

      let data = { ...data1, lastUpdated }

      await db.collection('users').doc(uid).update(data)
        .then(async () => {

          let title = "You Updated your account details";
          let updated_by = uid;

          let logData = { title, updated_by, lastUpdated }

          ///UPDATE ACTIVITY LOG
          handleResSuccessAndLog(db, res, logData, "success", data, res.statusCode);

        }).catch((e) => {
          handleResError(res, e, res.statusCode);
          return;
        })

    }
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
}


const passwordChange = async (req, res, next) => {
  try {
    if (req.cookies.uid) {
      let err;
      //Get the field values
      let uid = req.cookies.uid;
      const lastUpdated = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')
      const { current_password, new_password } = req.body;

      const data = {
        current_password,
        new_password,
        lastUpdated
      }

      /////COMPARE CURRENT PASSWORD////
      const get_user = await db.collection('users').doc(uid);
      const udata = await get_user.get();
      const existing_password = udata.data().password;

      bcrypt.compare(current_password, existing_password, async (error, resp) => {
        if (resp) {
          //encrypt / hash password
          const saltRounds = 10;
          await bcrypt.hash(new_password, saltRounds, (error, hash) => {
            console.log("new: ", hash)
            auth.updateUser(uid, {
              password: new_password,
            }).then(async (userDetails) => {

              // Update user collection with new password.
              db.collection('users').doc(uid)
                .set({
                  password: hash,
                }, { merge: true }).then(async () => {
                  let title = "You Updated your password";
                  let updated_by = uid;

                  let logData = { title, updated_by, lastUpdated }

                  ///UPDATE ACTIVITY LOG
                  // await db.collection('activity_log').doc().set(adData)
                  //   .then(()=>{       
                  //     handleResSuccess(res,"success", data, res.statusCode);  
                  // })
                  handleResSuccessAndLog(db, res, logData, "success", data, res.statusCode);


                }).catch((error) => {
                  err = {
                    message: error.message
                  }
                  handleResError(res, err, res.statusCode);

                });

            }).catch((e) => {
              handleResError(res, e, res.statusCode);
              return;
            })
          })

        } else {
          err = {
            message: "Your current password in incorrect."
          }
          handleResError(res, err, res.statusCode);

        }

      })


    }
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
}

const userActivityLog = async (req, res, next) => {
  let err;

  try {
    if (req.cookies.uid) {
      let uid = req.cookies.uid;
      const logSnapshot = await db.collection('activity_log')
        .where("user_id", "==", uid)
        .orderBy("lastUpdated", "desc")
        .get();
      let logArray = [];
      logSnapshot.forEach((doc) => {
        logArray.push({
          id: doc.id,
          data: doc.data()
        });
      });

      handleResSuccess(res, "Acitivity Log Details Extracted", logArray, res.statusCode);
    }
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
}



//UPDATE
const updateUserPhoto = async (req, res, next) => {
  try {
    if (req.cookies.uid) {
      let uid = req.cookies.uid;
      let err;

      if (!req.file) {
        //UPDATE Ads DETAILS //
        err = {
          message: "file not found"
        }
        handleResError(res, err, res.statusCode);

        return;
      }

      // Create new blob in the bucket referencing the file
      const blob = bucket.file(req.file.originalname);

      // Create writable stream and specifying file mimetype
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      blobWriter.on('error', (error) => {
        err = {
          message: error,
        };
        handleResError(res, err, res.statusCode);
      });

      blobWriter.on('finish', async () => {
        // Assembling public URL for accessing the file via HTTP
        let photoUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;

        let photoName = req.file.originalname;
        let photolastUpdated = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

        // Store Ads Details 
        let adData = { photoName, photoUrl, photolastUpdated }

        //INSERT Ads DETAILS TO DATABASE//
        await db.collection('users').doc(uid).set(adData, { merge: true })
          .then(async () => {
            //handleResSuccess(res, "success", photoUrl, res.statusCode);

            const title = "You updated your profile photo";
            const updated_by = uid;
            const lastUpdated = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')
            // const time_stamp = admin.firestore.FieldValue.serverTimestamp()
            // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            //  console.log(timestamp)

            let logData = { title, updated_by, lastUpdated }
            console.log(logData)

            handleResSuccessAndLog(db, res, logData, "success", adData, res.statusCode);

          }).catch((e) => {
            handleResError(res, e, res.statusCode);
            return;
          })

      });

      blobWriter.end(req.file.buffer);
    }
  } catch (e) {
    console.log("error", e)
    handleResError(res, e, res.statusCode);
    return;
  }
}



const assignRole = async (req, res, next) => {
  let err;

  if (req.cookies.uid) {
    // let uid = req.cookies.uid;
    let uid = "QKjtZSe3h4eqDkaf1Vz6KKOz9Hg2";

    let role = "Admin"

    auth.setCustomUserClaims(uid, {
      role: role
      // YOU CAN ADD ANY FIELDS IN THERE
    }).then(() => {
      handleResSuccess(res, `${uid} is now assigned` + role + " role", undefined, res.statusCode);

    })
  }
}

  const getUserRole = async (req, res, next) => {
    try {
      if (req.cookies.uid) {
        let uid = req.cookies.uid;
        auth.getUser(uid)
          .then((userRecord) => {
            let role = userRecord.customClaims.role;
            handleResSuccess(res, "User Role Retrieved", role , res.statusCode);
          })
      }
    } catch (e) {
      handleResError(res, e, res.statusCode);
    }
  }

  const userDelete = async (req, res, next) => {
    try {
      if (req.cookies.uid) {
        let uid = req.cookies.uid;
        //const id = req.params.id;
        const id = req.body.id;
        
        await auth.updateUser(id, { disabled: true })
        .then( async ()=>{ 
          await db.collection('users').doc(id).delete().then(()=>{
            handleResSuccess(res,"success", id, res.statusCode);   
          })
        })    
      } 
   } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
} 

module.exports = {
  usersViewAll,
  userViewById,
  userUpdate,
  passwordChange,
  userActivityLog,
  updateUserPhoto,
  assignRole,
  getUserRole,
  userDelete
}