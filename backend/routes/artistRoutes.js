const express = require("express");
const router = express.Router();
const {
  followArtist,
  getFollowedArtists,
} = require("../controllers/artistController");
const { requireAuth } = require("../middleware/auth");

// ============================================================================
// ARTIST ROUTES (as per project requirements)
// ============================================================================

// GET /artists/followed - Get user's followed artists
router.get("/followed", requireAuth, getFollowedArtists);

// PUT /artists - User follows an artist
router.put("/", requireAuth, followArtist);

module.exports = router;
