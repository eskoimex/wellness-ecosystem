const express = require('express');
const { userAppointment, confirmUserAppointment, viewUsersAppointments, viewUserAppointment } = require('../controllers/backend/appointment.backend.controller');

const router = express.Router();

  //HEADER CORS
  router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/user_appointment', userAppointment);
router.get('/confirm_appointment', confirmUserAppointment);
router.get('/appointments', viewUsersAppointments);
router.get('/appointment/:id', viewUserAppointment);


module.exports = {
    routes: router
}