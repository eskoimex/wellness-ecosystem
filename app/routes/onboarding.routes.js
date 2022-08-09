const express = require('express');
const { checkIfAuthenticated } = require('../middleware/auth.middleware');
const { userOnboarding } = require('../controllers/backend/onboarding.backend.controller');

const router = express.Router();


router.post('/onboarding', checkIfAuthenticated, userOnboarding);



module.exports = {
    routes: router
}