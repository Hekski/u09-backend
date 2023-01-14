const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

const auth = asyncHandler(async (req, res, next) => {
   try {
      const token = req.cookies.jwttoken;

      if (!token) {
         return next('Please login to access the data');
      }

      const decoded = jwt.verify(token, process.env.DB_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      // req.user = decoded;

      console.log('req.header: ', req.header);
      next();
   } catch (error) {
      // res.clearCookie('jwttoken');
      return res.status(400).json({
         success: false,
         message: 'Please log in',
      });
   }
});

module.exports = auth;
