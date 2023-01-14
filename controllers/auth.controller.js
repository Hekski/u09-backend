const { authService } = require('../services');
const { User } = require('../models/user');

const authController = {
   // @desc    Register a new user
   // @route   Post /api/auth/register
   // @access  Public
   async register(req, res, next) {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.status(400).json({
            success: false,
            message: 'Please fill all fields',
            data: null,
         });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({
            success: false,
            message: 'User already exists',
            data: null,
         });
      }

      try {
         const user = await authService.createUser(name, email, password);
         const token = authService.genAuthToken(user);

         res.send({
            user,
            jwttoken: token,
            success: true,
            message: 'User created',
         });
      } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
         });
      }
   },

   // @desc    Signin a user
   // @route   Post /api/auth/login
   // @access  Public
   async login(req, res, next) {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user)
         return res.status(400).json({
            success: false,
            message: 'The given email is not registered',
         });

      try {
         if (await user.comparePassword(password)) {
            const token = authService.genAuthToken(user);
            res.json({
               user: user.toObject(),
               jwttoken: token,
               success: true,
               message: 'User logged in',
            });
         } else {
            return res.status(401).json({
               success: false,
               message: 'Invalid email or password',
               data: null,
            });
         }
      } catch (error) {
         res.status(500).json({
            success: false,
            message: error,
         });
      }
   },

   // @desc    Check user authentication
   // @route   Get /api/auth/isauth
   // @access  Public
   async isauth(req, res, next) {
      res.json(req.user);
      console.log(req.user);
   },

   // @desc    Signout user
   // @route   Get /api/auth/signout
   // @access  Private
   async signout(req, res, next) {
      try {
         res.clearCookie('jwttoken');
         res.status(202).json({
            success: true,
            message: 'Signed out',
         });
      } catch (error) {
         res.status(500).json({
            success: false,
            message: error,
         });
      }
   },
};

module.exports = authController;
