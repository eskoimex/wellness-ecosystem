require("firebase/auth");
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require('../../wellness-ecosystem-firebase-adminsdk-bt5fx-62a9e4cde0.json');

const firebaseConfig = {
  apiKey: "AIzaSyAQisxgE5Bvqg0GY34_TQNApTWQ6Jd3PfM",
  authDomain: "wellness-ecosystem.firebaseapp.com",
  projectId: "wellness-ecosystem",
  storageBucket: "wellness-ecosystem.appspot.com",
  messagingSenderId: "343759121686",
  appId: "1:343759121686:web:fdbc5df88e3fc2c0feb437",
  measurementId: "G-RLR79XZLWX"
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://wellness-ecosystem.firebaseio.com"
});

const db = admin.firestore(); // Add this
const auth = admin.auth(); // Add this


//FIREBASE FUNCTIONS
const firebase_auth = firebase.auth(); // Add this


module.exports = { firebase, db, auth, firebase_auth, admin };


