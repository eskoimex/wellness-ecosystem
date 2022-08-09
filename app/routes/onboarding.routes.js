const express = require('express');
const { userOnboarding } = require('../controllers/backend/onboarding.backend.controller');

const router = express.Router();


router.post('/onbording', userOnboarding);



module.exports = {
    routes: router
}