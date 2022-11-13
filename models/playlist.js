const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    // required: true,
  },
  description: {
    type: String,
  },
  songs: {
    type: [],
    default: [],
  },
  /*   img: {
    type: String,
  }, */
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist };
