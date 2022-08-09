const express = require('express');
const { userAppointment } = require('../controllers/backend/appointment.backend.controller');

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
router.get('/confirm_appointment', userAppointment);



module.exports = {
    routes: router
}