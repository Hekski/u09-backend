const { User } = require('../models/user');
const { Song } = require('../models/song');
var ObjectId = require('mongodb').ObjectId;

const songController = {
  // @desc    Get all likes
  // @route   Get /api/songs/like
  // @access  Private
  async getLikes(req, res) {
    const user = await User.findById(req.params.id);
    try {
      const listItems = user.likedSongs;
      console.log(listItems);
      // const listItems = user.likedSongs.map((item) => item);
      res.status(200).json({
        success: true,
        count: listItems.length,
        data: listItems,
      });
      if (listItems === null) res.status('No likes found');
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error: ' + error,
      });
    }
  },

  // @desc    Post a like
  // @route   Post /api/songs/like/:id
  // @access  Private
  async postLike(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const song = await Song(req.body);

      user.likedSongs.push(song);
      res.status(200).json({
        success: true,
        message: 'Added to your liked songs',
        data: song,
      });

      await user.save();
    } catch (error) {
      if (error) {
        res.status(400).send({ message: 'Like not added' });
      }
    }
  },

  // @desc    Delete a like
  // @route   Delete /api/songs/like/:id
  // @access  Private
  async deleteLike(req, res) {
    const user = await User.findById(req.params.id);
    const song = await Song(req.body.id);

    try {
      // user.likedSongs.deleteOne({ _id: req.body._id });
      const result = await user.likedSongs.deleteOne(song);
      res.status(200).json({
        success: result.acknowledged,
        data: result,
      });
      await user.save();
    } catch (error) {
      if (error) {
        res.status(400).send({ message: 'Like could not be deleted' });
      }
    }
  },
};

module.exports = songController;
