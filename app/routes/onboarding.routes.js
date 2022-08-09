const express = require('express');
const { checkIfAuthenticated } = require('../middleware/auth.middleware');
const { userOnboarding } = require('../controllers/backend/onboarding.backend.controller');

const router = express.Router();

  //HEADER CORS
router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/onboarding', checkIfAuthenticated, userOnboarding);



module.exports = {
    routes: router
}