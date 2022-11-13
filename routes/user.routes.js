const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Routes
router.get('/:id', auth, userController.getUserProfile);
router.put('/:id', auth, userController.updateUser);

module.exports = router;
