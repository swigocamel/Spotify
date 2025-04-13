// src/routes/coaches.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/coachController');
const handleErrorAsync = require('../utils/handleErrorAsync');

router.post('/auth/signup', handleErrorAsync(userController.postSignUp));
router.get('/coach-list', handleErrorAsync(userController.getCoachList));

module.exports = router;
