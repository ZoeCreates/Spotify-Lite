const User = require("../models/User");

// ============================================================================
// DYNAMIC USER ID MANAGEMENT
// ============================================================================

// Helper function to get the first available user (for demo purposes)
const getFirstAvailableUser = async () => {
  const user = await User.findOne().select("_id username");
  if (!user) {
    throw new Error(
      "No users found in database. Please run seedData.js first."
    );
  }
  console.log(`Using user: ${user.username} (${user._id})`);
  return user._id;
};

// Helper function to get user by username
const getUserByUsername = async (username) => {
  const user = await User.findOne({ username }).select("_id username");
  if (!user) {
    throw new Error(`User with username '${username}' not found.`);
  }
  console.log(`Using user: ${user.username} (${user._id})`);
  return user._id;
};

// ============================================================================
// USER OPERATIONS (as per project requirements)
// ============================================================================

/**
 * @desc    Get all songs liked by a specific user
 * @route   GET /user/songs
 * @access  Public
 */
const getUserLikedSongs = async (req, res) => {
  try {
    // Get user ID dynamically - you can specify username in query params or use first available user
    let userId;
    if (req.query.username) {
      userId = await getUserByUsername(req.query.username);
    } else {
      userId = await getFirstAvailableUser();
    }

    const user = await User.findById(userId)
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
 * @access  Public
 */
const updateUserInfo = async (req, res) => {
  try {
    // Get user ID dynamically - you can specify username in query params or use first available user
    let userId;
    if (req.query.username) {
      userId = await getUserByUsername(req.query.username);
    } else {
      userId = await getFirstAvailableUser();
    }

    const { username, email, password } = req.body;

    // Build update object (only include provided fields)
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

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

// 获取当前用户信息
const getUserInfo = async (req, res) => {
  try {
    let userId;
    if (req.query.username) {
      userId = await getUserByUsername(req.query.username);
    } else {
      userId = await getFirstAvailableUser();
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getUserLikedSongs,
  updateUserInfo,
  getFirstAvailableUser,
  getUserByUsername,
  getUserInfo,
};
