const User = require("../models/User");

// ============================================================================
// USER OPERATIONS (as per project requirements)
// All routes run behind requireAuth, so req.user is the logged-in user and a
// request can only read or change that user's own data.
// ============================================================================

/**
 * @desc    Get all songs liked by the logged-in user
 * @route   GET /user/songs
 * @access  Private
 */
const getUserLikedSongs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "likedSongs",
        populate: {
          path: "artist",
          select: "name",
        },
      })
      .select("likedSongs");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.json({
      status: "success",
      data: user.likedSongs,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @desc    User updates profile info (username, email, password)
 * @route   PUT /user/info
 * @access  Private
 */
const updateUserInfo = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Load and save the document (instead of findByIdAndUpdate) so the
    // pre-save hook hashes a new password
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (typeof username === "string" && username) user.username = username;
    if (typeof email === "string" && email) user.email = email;
    if (typeof password === "string" && password) user.password = password;

    await user.save();

    res.json({
      status: "success",
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        status: "error",
        message: `${field} already exists`,
      });
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @desc    Get the logged-in user's profile info
 * @route   GET /user/info
 * @access  Private
 */
const getUserInfo = async (req, res) => {
  res.json({ status: "success", data: req.user });
};

/**
 * @desc    Get all users (public profile fields only)
 * @route   GET /user
 * @access  Private
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "username firstName lastName profilePicture"
    );

    res.json({
      status: "success",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getUserLikedSongs,
  updateUserInfo,
  getUserInfo,
  getAllUsers,
};
