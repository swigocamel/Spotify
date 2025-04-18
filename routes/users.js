// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const handleErrorAsync = require('../utils/handleErrorAsync');

router.post('/auth/signup', handleErrorAsync(userController.postSignUp));
router.get('/list', handleErrorAsync(userController.getUserList));

module.exports = router;
