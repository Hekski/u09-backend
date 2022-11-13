const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
    maxLength: 255,
  },
  artist_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
  albumUrl: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model('song', songSchema);

module.exports = { Song };
