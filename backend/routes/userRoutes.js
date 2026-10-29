const express = require("express");
const router = express.Router();
const {
  getUserLikedSongs,
  updateUserInfo,
  getUserInfo,
  getAllUsers,
} = require("../controllers/userController");
const { requireAuth } = require("../middleware/auth");

// Every user route acts on the logged-in user
router.use(requireAuth);

// ============================================================================
// USER ROUTES (as per project requirements)
// ============================================================================

// GET /user - Get all users (public profile fields)
router.get("/", getAllUsers);

// GET /user/songs - Get all songs liked by the logged-in user
router.get("/songs", getUserLikedSongs);

// PUT /user/info - User updates profile info (username, email, password)
router.put("/info", updateUserInfo);

// GET /user/info - Get user profile info
router.get("/info", getUserInfo);

module.exports = router;
