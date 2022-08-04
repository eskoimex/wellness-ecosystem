const express = require('express');
const { userRegistration, userLogin, userLogout, resetPassword} = require('../controllers/backend/auth.backend.controller');

const router = express.Router();


router.post('/login', userLogin);
router.post('/register', userRegistration);
router.post('/reset_password', resetPassword);
router.get('/logout', userLogout);

module.exports = {
    routes: router
}