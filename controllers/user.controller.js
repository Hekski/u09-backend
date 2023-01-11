const { User } = require('../models/user');

const userController = {
   // @desc    Get user profile
   // @route   Get /api/user/:id
   // @access  Private
   async getUserProfile(req, res) {
      try {
         const user = await User.findById(req.params.id).select(
            '-password -__v'
         );
         res.json(user);
      } catch (error) {
         if (error) {
            res.status(400).send({ message: 'User not found' });
         }
      }
   },

   // @desc    Update user
   // @route   Put /api/user/:id
   // @access  Private
   async updateUser(req, res) {
      try {
         const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
         ).select('-password -__v');
         res.status(200).send({
            data: user,
            message: 'Profile updated successfully',
         });
      } catch (error) {
         res.status(400).send({ message: 'Error when trying to update' });
      }
   },
};
module.exports = userController;
