const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

const auth = asyncHandler(async (req, res, next) => {
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      try {
         token = req.headers.authorization.split(' ')[1];
         console.log(token);
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         console.log('decoded', decoded);
         req.user = decoded;
         next();
      } catch (error) {
         return res.status(400).json({
            success: false,
            message: 'Please log in',
         });
      }
      if (!token) {
         return next('Please login to access the data');
      }
   }
});

module.exports = auth;
