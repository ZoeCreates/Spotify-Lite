const express = require("express");
const router = express.Router();
const { searchSongs, likeSong } = require("../controllers/songController");

// ============================================================================
// SONG ROUTES (as per project requirements)
// ============================================================================

// GET /songs?search=...&language=...&genre=... - Search for songs with filters
router.get("/", searchSongs);

// PUT /songs - User likes a song
router.put("/", likeSong);

module.exports = router;
