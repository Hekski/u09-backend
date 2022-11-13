const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    
    if (!token) {
      return next('Please login to access the data');
    }
    
    const decoded = jwt.verify(token, process.env.DB_SECRET);
    
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('jwttoken');
    return res.status(400).json({
      success: false,
      message: 'Please log in',
    });
  }
});

module.exports = auth;
