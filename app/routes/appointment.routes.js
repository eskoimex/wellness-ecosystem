const express = require('express');
const { userAppointment } = require('../controllers/backend/appointment.backend.controller');

const router = express.Router();


router.post('/user_appointment', userAppointment);



module.exports = {
    routes: router
}