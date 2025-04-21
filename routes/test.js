// src/routes/test.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// 範例：GET /test/user
router.get('/:table', testController.getAllFromTable);

module.exports = router;
