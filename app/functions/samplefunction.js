'use strict';
const { db, bucket} = require('../utils/db')
const FieldValue = require('firebase-admin').firestore.FieldValue;
const Ads = require('../models/ads.model');
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const moment = require('moment');


// Upload endpoint to send file to Firebase storage bucket

//CREATE
const adCreate = async (req, res, next) => {
  try {
    if(req.cookies.uid){
      let uid = req.cookies.uid;
      let err;
      
        if (!req.file) {
           err = {
                    message: "Please upload an image or video Ad",
              };
             handleResError(res, err, res.statusCode); 

          return;
        }          

          // get form data from from front end.
          const data = req.body;
          const createdAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

         // Create new blob in the bucket referencing the file
          const blob = bucket.file(req.file.originalname);

          // Create writable stream and specifying file mimetype
          const blobWriter = blob.createWriteStream({
            metadata: {
              contentType: req.file.mimetype,
            },
          });

          blobWriter.on('error', (error) =>{
              err = {
                    message: error,
              };
              handleResError(res, err, res.statusCode); 
            });

          blobWriter.on('finish', async () => {
            // Assembling public URL for accessing the file via HTTP
            const adUrl = `https://firebasestorage.googleapis.com/v0/b/${
              bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;

            const adName = req.file.originalname;
            const status = "In Active"
            const user_id = uid;

            // Store Ads Details 
            let adData = { ...data, adName, adUrl, createdAt, status, user_id}

            //INSERT Ads DETAILS TO DATABASE//
              await db.collection('ads').doc().set(adData)
              .then(()=>{       
                ///UPDATE USER COLLECTION WITH AD COUNT
                const increment = FieldValue.increment(1);                
                // Document reference
                const userRef = db.collection('users').doc(uid);
                // Update read count
                userRef.update({ num_of_ads: increment }).then(()=>{
                    handleResSuccess(res,"success", adUrl, res.statusCode);  
                })
              })
          
          });

          blobWriter.end(req.file.buffer);
        }
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
};



//VIEW ALL ADS 
const adsViewAll = async (req, res, next) => {
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



const adsViewById = async (req, res, next) => {
    let err;

    try {
      if(req.cookies.uid){
        let uid = res.cookies.uid
        const adsSnapshot = await db.collection('ads')
                                   .where("user_id", "==", uid)
                                   .get();
             
        let adsArray = [];        
              adsSnapshot.forEach((doc) => {
                adsArray.push({
                  id: doc.id,
                  data: doc.data()
                });

              });
            
          handleResSuccess(res, "Ads Fetched Successfully", adsArray, res.statusCode);  
            }
    } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}

//VIEW AD BY ID
const adView = async (req, res, next) => {
    try {
        const id = req.params.id;
        const ad = await db.collection('ads').doc(id);
        const data = await ad.get();
        if(!data.exists) {
             err = {
                    message: "Ad with the given ID not found",
              };
              handleResError(res, err, res.statusCode); 
        }else {
          const adData = data.data()
          handleResSuccess(res, "Ad Fetched Successfully", adData, res.statusCode);  
        }
    } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}



//VIEW AD BY USER ID
const userAdView = async (req, res, next) => {
  try {
      const id = req.params.id;
     // const user = await db.collection('users').doc(id);

      const adsSnapshot = await db.collection('ads')
              .where("user_id", "==", id)
              .get();

        let ads = []; 
        let ads_count = 0;
            adsSnapshot.forEach((doc) => {
                  ads.push({
                  id: doc.id,
                  data: doc.data()
            });
        });

        handleResSuccess(res, "Ads Fetched Successfully", ads, res.statusCode);  

  } catch (e) {
        handleResError(res, e, res.statusCode);      
      }
}

//UPDATE
const adEdit = async (req, res, next) => {
    try {
          let err;

          let id = req.params.id;

            // get form data from from front end.
          const data = req.body;

           let lastUpdated = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')

           let adData = { ...data, lastUpdated}

        if (!req.file) {
            //UPDATE Ads DETAILS //
              await db.collection('ads').doc(id).update(adData)
              .then(()=>{       
                handleResSuccess(res,"success", id, res.statusCode);  
              }).catch((e)=>{
                handleResError(res,e, res.statusCode);  
              })
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

          blobWriter.on('error', (error) =>{
              err = {
                    message: error,
              };
              handleResError(res, err, res.statusCode); 
            });

          blobWriter.on('finish', async () => {
            // Assembling public URL for accessing the file via HTTP
            let adUrl = `https://firebasestorage.googleapis.com/v0/b/${
              bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;

             let adName = req.file.originalname;
            
            // Store Ads Details 
            let adData = { ...data, adName, adUrl, lastUpdated}

            //INSERT Ads DETAILS TO DATABASE//
              await db.collection('ads').doc(id).update(adData)
              .then(()=>{       
                handleResSuccess(res,"success", adUrl, res.statusCode);  
              }).catch ((e)=> {
                    handleResError(res, e, res.statusCode);     
                    return;
              })
          
          });

          blobWriter.end(req.file.buffer);
        
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
}

//CLONE
const adClone = async (req, res, next) => {
    try {
      if(req.cookies.uid){
        let uid = req.cookies.uid;
        //const id = req.params.id;
        const data1 = req.body;
        const createdAt = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A')
        const status = "Active";
        const user_id = uid;

        let data = {...data1, createdAt, status, user_id}

        const ad =  await db.collection('ads').doc();
        await ad.set(data).then(()=>{
     
        const increment = FieldValue.increment(1);                
        // Document reference
        const userRef = db.collection('users').doc(uid);
        // Update read count
        userRef.update({ num_of_ads: increment }).then(()=>{
          handleResSuccess(res, "success", user_id, res.statusCode);      
        })
             
        })
      }  
   } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}


const adDelete = async (req, res, next) => {
    try {
        //const id = req.params.id;
        if(req.cookies.uid){
          let uid = req.cookies.uid;
          const id = req.body.id;
          await db.collection('ads').doc(id).delete().then(()=>{
              ///UPDATE USER COLLECTION WITH AD COUNT
              const decrement = FieldValue.increment(-1);                
              // Document reference
              const userRef = db.collection('users').doc(uid);
              // Update read count
              userRef.update({ num_of_ads: decrement }).then(()=>{
                handleResSuccess(res,"success", id, res.statusCode);        
              })
          })
      }
   } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}


const userAdDelete = async (req, res, next) => {
  try {
      //const id = req.params.id;
      if(req.cookies.uid){
        let uid = req.cookies.uid;
        const id = req.body.id;
        ///////////////
        const user = await db.collection('ads').doc(id).get();
        const user_id = user.data().user_id;
        ///////////////
        await db.collection('ads').doc(id).delete().then(()=>{
            ///UPDATE USER COLLECTION WITH AD COUNT
            const decrement = FieldValue.increment(-1);                
            // Document reference
            const userRef = db.collection('users').doc(user_id);
            // Update read count
            userRef.update({ num_of_ads: decrement }).then(()=>{
              handleResSuccess(res,"success", id, res.statusCode);        
            })
        })
    }
 } catch (e) {
        handleResError(res, e, res.statusCode);      
      }
}

const adPackageDetails = async (req, res, next) => {
  let err;
    try {
        const package_name = req.body.package_name;
        const ad_package = await db.collection('packages').doc(package_name);
        const data = await ad_package.get();      
       if(!data.exists) {
             err = {
                    message: "Packaged does not exist",
              };
              handleResError(res, err, res.statusCode); 
        }else {
          const adPackage = data.data()
          handleResSuccess(res, "Ad Package Fetched Successfully", adPackage, res.statusCode);  
        }   
      } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}

const getAdPackageDetails = async (req, res, next) => {
  let err;
    try {
      
        const ad_package = await db.collection('packages');
        const data = await ad_package.get();      
 
        let packageArray = [];        
              data.forEach((doc) => {
                packageArray.push({
                  id: doc.id,
                  data: doc.data()
                });
              });
      //  if(!data.exists) {
      //        err = {
      //               message: "Package does not exist",
      //         };
      //         handleResError(res, err, res.statusCode); 
      //   }else {
          handleResSuccess(res, "Ad Package Fetched Successfully", packageArray, res.statusCode);  
       // }   
      } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}


const adLocationDetails = async (req, res, next) => {
  let err;
    try {
        const location_name = req.body.location_name;
        const location = await db.collection('locations').doc(location_name);
        const data = await location.get();      
       if(!data.exists) {
             err = {
                    message: "Location does not exist",
              };
              handleResError(res, err, res.statusCode); 
        }else {
          const adLocation = data.data()
          handleResSuccess(res, "Location Fetched Successfully", adLocation, res.statusCode);  
        }   } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}


const getAdLocationDetails = async (req, res, next) => {
  let err;
    try {
      
        const ad_location = await db.collection('locations');
        const data = await ad_location.get();      
 
        let locationArray = [];        
              data.forEach((doc) => {
                locationArray.push({
                  id: doc.id,
                  data: doc.data()
                });
              });
      //  if(!data.exists) {
      //        err = {
      //               message: "Package does not exist",
      //         };
      //         handleResError(res, err, res.statusCode); 
      //   }else {
          handleResSuccess(res, "Ad Location Fetched Successfully", locationArray, res.statusCode);  
       // }   
      } catch (e) {
          handleResError(res, e, res.statusCode);      
        }
}


const adCount = async (req, res) => {
         try {
 if(req.cookies.uid){
    
            let uid = req.cookies.uid;
            console.log(uid)
        const adsSnapshot = await db.collection('ads')
                                   .where("user_id", "==", uid)
                                   .get();
                      
        let ads = []; 
        let ads_count = 0;
                  
              adsSnapshot.forEach((doc) => {
                    ads.push({
                    id: doc.id,
                    data: doc.data()
                    });
              });
             
        //COUNT ADS
        for (let i = 0 ; i < ads.length; i++){
                ads_count++;
        }
          handleResSuccess(res, "Total Ads", ads_count, res.statusCode);  


        }
        } catch (e) {
           handleResError(res, e, res.statusCode);          
        }
}



const activeAdCount= async (req, res) => {
         try {
 if(req.cookies.uid){
    
            let uid = req.cookies.uid;
        const adsSnapshot = await db.collection('ads')
                                   .where("user_id", "==", uid)
                                   .get();
                      
        let ads = [];  
        let active_ads_count = 0;
      
              adsSnapshot.forEach((doc) => {
                    ads.push({
                    id: doc.id,
                    data: doc.data()
                    });
              });

        //COUNT ACTIVE ADS
        for (let i = 0 ; i < ads.length; i++){
            if(ads[i].data.status === "Active"){
                active_ads_count++;
            }
        }
          handleResSuccess(res, "Total Active Ads", active_ads_count, res.statusCode);  

        }
        } catch (e) {
           handleResError(res, e, res.statusCode);          
        }
}



//UPDATE
const adStatusUpdate = async (req, res, next) => {
    try {
          let err;
            // get form data from from front end.
         // const id = req.body.id;
          const {id, ad_status} = req.body;
          console.log(req.body)

           let lastStatusUpdate = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm A');
           //let adid = id;
           let status = ad_status;
           let adData = { status, lastStatusUpdate }  

            //UPDATE Ads STATUS TO DATABASE//
              await db.collection('ads').doc(id).set(adData,{merge:true})
              .then(()=>{       
               handleResSuccess(res,"success", adData, res.statusCode);  
                //req.flash('msuccess', 'Ad Status Successfully Updated')
              }).catch ((e)=> {
                 handleResError(res, e, res.statusCode);    
                 //req.flash('warning', e) 
                    return;
              })
        
  } catch (e) {
      console.log("error", e)
        handleResError(res, e, res.statusCode);     
        return;
  }
}

module.exports = { 
  adCreate, 
  adsViewAll, 
  adsViewById, 
  adView, 
  userAdView,
  adEdit, 
  adClone, 
  adDelete,
  userAdDelete,
  //////
  adPackageDetails,
  getAdPackageDetails,
  adLocationDetails,
  getAdLocationDetails,
  /////
  adCount,
  activeAdCount,
  adStatusUpdate
}