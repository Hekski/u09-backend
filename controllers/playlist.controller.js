const { User } = require('../models/user');
const { Playlist } = require('../models/playlist');

const playlistController = {
   // @desc    Get all playlists
   // @route   Get /api/playlists
   // @access  Private

   async getAllPlaylists(req, res) {
      const playlists = await Playlist.find();
      res.status(200).send({ data: playlists });
   },

   // @desc    Get playlists by id
   // @route   Get /api/playlists/:id
   // @access  Private

   async getPlaylistsById(req, res) {
      const playlists = await Playlist.find({ user: req.params.id });
      try {
         res.status(200).json({
            success: true,
            count: playlists.length,
            data: playlists,
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Server error: ' + error,
         });
      }
   },

   // @desc    Create playlist
   // @route   Post /api/playlists/:id
   // @access  Private

   async createPlaylist(req, res) {
      try {
         const user = await User.findById(req.params.id);
         const playList = await Playlist({
            ...req.body,
            user: user._id,
         }).save();
         user.playlists.push(playList._id);
         await user.save();
      } catch (error) {
         return res.status(400).send(error);
      }
   },

   // @desc    Add song to playlist
   // @route   Put /api/playlists/:id
   // @access  Private

   async addSongToPlaylist(req, res) {
      const playlist = await Playlist.findById({ _id: req.params.id });
      console.log(typeof req.body);
      console.log(req.body);
      try {
         playlist.songs.push(req.body);
         await playlist.save();

         res.status(200).send({ data: playlist, message: 'Added to playlist' });
      } catch (error) {
         return res.status(400).send(error);
      }
   },
};

module.exports = playlistController;
