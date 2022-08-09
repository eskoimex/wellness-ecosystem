'use strict';
const { auth} = require('../utils/db')
const { handleResError } = require("../utils/err.util");
const Multer = require('multer');


const checkIfAuthenticated = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
    console.log("User Token",req.authToken)
  } else {
    req.authToken = null;
    console.log("null")
  }
  next();
};


const checkIfAuthenticated2 = (req, res, next) => {
 getAuthToken(req, res, async () => {
let err;
    try {
      const { authToken } = req;
      console.log(authToken)
      const userInfo = await auth.verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
        err = {
            message: `You are not authorized to view this page, ${e}`
        }
        handleResError(res, err, res.statusCode);
    }
  });
};

const checkIfUserAuthenticated = (req, res, next) => {
let err;
    try {
      if (req.cookies.uid) {
            console.log("user is logged in")
      }else{
        res.redirect('/login')
      }
      return next();
    } catch (e) {
        err = {
            message: `You are not authorized to view this page, ${e}`
        }
        handleResError(res, err, res.statusCode);
    }
  
};


//const checkIfAdmin= (req, res, next) => {}

const checkUpload = (req, res, next) => {
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

return multer.single('avatar')

}

module.exports = { checkIfAuthenticated, checkIfAuthenticated2, checkIfUserAuthenticated, checkUpload }