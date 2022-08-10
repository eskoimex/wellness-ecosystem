const express = require('express');
const { userAppointment, confirmUserAppointment, viewUsersAppointments, viewUserAppointment } = require('../controllers/backend/appointment.backend.controller');
const { checkIfAuthenticated } = require('../middleware/auth.middleware');

const router = express.Router();

  //HEADER CORS
  router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/user_appointment', checkIfAuthenticated, userAppointment);
router.get('/confirm_appointment', checkIfAuthenticated, confirmUserAppointment);
router.get('/appointments', checkIfAuthenticated, viewUsersAppointments);
router.get('/appointment/:id', checkIfAuthenticated, viewUserAppointment);


module.exports = {
    routes: router
}