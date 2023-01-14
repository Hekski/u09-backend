const jwt = require('jsonwebtoken');
/// MODELS
const { User } = require('../models/user');

const createUser = async (name, email, password) => {
   try {
      if (!name || !email || !password) {
         throw new Error.json({
            success: false,
            message: 'Please fill all fields',
            data: null,
         });
      }
      if (await User.emailTaken(email)) {
         throw new Error.json({
            success: false,
            message: 'Email already taken',
            data: null,
         });
      }

      const user = new User({
         name,
         email,
         password,
      });
      await user.save();
      return user;
   } catch (error) {
      throw error;
   }
};

const genAuthToken = (user) => {
   const userObj = { sub: user._id.toHexString(), email: user.email };
   const token = jwt.sign(userObj, process.env.JWT_SECRET, {
      expiresIn: '1d',
   });
   return token;
};

module.exports = {
   createUser,
   genAuthToken,
};
