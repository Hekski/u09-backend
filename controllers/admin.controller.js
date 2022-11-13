const { User } = require('../models/user');

const adminController = {
  // @desc    Get all users
  // @route   Get /api/admin
  // @access  Private/Admin
  async getUsers(req, res) {
    try {
      const users = await User.find({}).select('-password -__v');
      res.json(users);
    } catch (error) {
      res.status(400).send({ message: 'Could not get users' });
    }
  },

  // @desc    Delete user
  // @route   Delete /api/admin/:id
  // @access  Private/Admin
  async deleteUser(req, res) {
    try {
      const result = await User.deleteOne({ _id: req.params.id });
      res.status(200).json({
        success: result.acknowledged,
        data: result,
      });
    } catch (error) {
      if (error) {
        res.status(400).send({ message: 'Error when trying to delete' });
      }
    }
  },

  // @desc    Update user
  // @route   Put /api/admin/:id
  // @access  Private/Admin
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).select('-password -__v');
      res
        .status(200)
        .send({ data: user, message: 'Profile updated successfully' });
    } catch (error) {
      res.status(400).send({ message: 'Error when trying to update' });
    }
  },
};
module.exports = adminController;
