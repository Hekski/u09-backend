const express = require('express');
const songController = require('../controllers/song.controller');
const router = express.Router();
// const validateObjectId = require('../middleware/validateObjectId');

// Middleware
const auth = require('../middleware/auth');

// Routes
router.get('/like/:id', auth, songController.getLikes);
router.post('/like/:id', auth, songController.postLike);
router.delete('/like/:id', auth, songController.deleteLike);

module.exports = router;
