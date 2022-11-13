const express = require('express');
const playlistController = require('../controllers/playlist.controller');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');

// Middleware
const auth = require('../middleware/auth');

// Routes
router.get('/', playlistController.getAllPlaylists);
router.get('/:id', playlistController.getPlaylistsById);
router.post('/:id', playlistController.createPlaylist);
router.put('/:id', playlistController.addSongToPlaylist);

module.exports = router;
