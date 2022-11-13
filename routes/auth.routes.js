const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/isauth', auth, authController.isauth);

router.get('/signout', auth, authController.signout);

module.exports = router;
