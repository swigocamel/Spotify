// src/routes/coaches.js
const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');
const handleErrorAsync = require('../utils/handleErrorAsync');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/list', handleErrorAsync(coachController.getCoachList));
router.get('/profile', authMiddleware, handleErrorAsync(coachController.getCoachProfile));

module.exports = router;
