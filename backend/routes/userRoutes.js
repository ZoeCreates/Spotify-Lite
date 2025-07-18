const express = require("express");
const router = express.Router();
const {
  getUserLikedSongs,
  updateUserInfo,
  getUserInfo,
} = require("../controllers/userController");

// ============================================================================
// USER ROUTES (as per project requirements)
// ============================================================================

// GET /user/songs - Get all songs liked by a specific user
router.get("/songs", getUserLikedSongs);

// PUT /user/info - User updates profile info (username, email, password)
router.put("/info", updateUserInfo);

// GET /user/info - Get user profile info
router.get("/info", getUserInfo);

module.exports = router;
