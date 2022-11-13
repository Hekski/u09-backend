const express = require('express');
const adminController = require('../controllers/admin.controller');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Routes

router.get('/', auth, adminController.getUsers);
router.delete('/:id', auth, adminController.deleteUser);
router.put('/:id', auth, adminController.updateUser);

module.exports = router;
