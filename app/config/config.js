'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();


const {
    NAME,
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    //
    PROJECTID,
    BUCKET,
} = process.env;

assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');

module.exports = {
    name: NAME,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    },
    google: {
		projectId: PROJECTID,
		bucket: BUCKET
	},
   
}