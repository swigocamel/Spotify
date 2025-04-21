// src/routes/coaches.js
const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');
const handleErrorAsync = require('../utils/handleErrorAsync');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/auth/signup', handleErrorAsync(coachController.postSignUp));
router.get('/list', handleErrorAsync(coachController.getCoachList));
router.post('/auth/login', handleErrorAsync(coachController.postLogin));
router.get('/profile', authMiddleware, handleErrorAsync(coachController.getCoachProfile));

module.exports = router;
