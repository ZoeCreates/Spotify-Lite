const express = require("express");
const router = express.Router();
const {
  followArtist,
  getFollowedArtists,
} = require("../controllers/artistController");

// ============================================================================
// ARTIST ROUTES (as per project requirements)
// ============================================================================

// GET /artists/followed - Get user's followed artists
router.get("/followed", getFollowedArtists);

// PUT /artists - User follows an artist
router.put("/", followArtist);

module.exports = router;
