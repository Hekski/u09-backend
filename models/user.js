const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
   name: {
      type: String,
      maxLength: 50,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },
   password: {
      type: String,
      required: true,
      trim: true,
   },
   isAdmin: {
      type: Boolean,
      default: false,
   },
   role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
   },
   date: {
      type: Date,
      default: Date.now,
   },
   likedSongs: {
      type: [],
      default: [],
   },
   playlists: {
      type: [],
      default: [],
   },
});

userSchema.pre('save', async function (next) {
   let user = this;

   if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
   }
   next();
});

userSchema.statics.emailTaken = async function (email) {
   const user = await this.findOne({ email });
   return !!user;
};

userSchema.methods.generateAuthToken = function () {
   let user = this;
   const userObj = { sub: user._id.toHexString(), email: user.email };
   const token = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: '1d' });
   return token;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
   // candidate password = un-hashed password
   const user = this;
   const match = await bcrypt.compare(candidatePassword, user.password);
   return match;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
