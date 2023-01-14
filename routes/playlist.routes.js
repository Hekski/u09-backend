const express = require('express');
const playlistController = require('../controllers/playlist.controller');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');

// Middleware
const auth = require('../middleware/auth');

// Routes
router.get('/', auth, playlistController.getAllPlaylists);
router.get('/:id', auth, playlistController.getPlaylistsById);
router.post('/:id', auth, playlistController.createPlaylist);
router.put('/:id', auth, playlistController.addSongToPlaylist);

module.exports = router;
