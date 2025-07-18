const Song = require("../models/Song");
const User = require("../models/User");
const Artist = require("../models/Artist");

// ============================================================================
// HARDCODED USER ID FOR TESTING (as per project requirements)
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

// ============================================================================
// SONG OPERATIONS (as per project requirements)
// ============================================================================

/**
 * @desc    Search for songs by title or artist name, and optionally filter by language and genre
 * @route   GET /songs?search=...&language=...&genre=...
 * @access  Public
 */
const searchSongs = async (req, res) => {
  try {
    const { search, genre, language } = req.query;
    let query = {};

    // 只用 genre/language 过滤，search 用内存过滤
    if (genre) {
      query.genre = genre;
    }
    if (language) {
      query.language = language;
    }

    // 先查所有歌并 populate
    const songs = await Song.find(query).populate("artist", "name");

    let filteredSongs = songs;
    if (search) {
      filteredSongs = songs.filter((song) => {
        const titleMatch = song.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const artistMatch =
          song.artist &&
          song.artist.name.toLowerCase().includes(search.toLowerCase());
        return titleMatch || artistMatch;
      });
    }

    res.json({
      status: "success",
      data: filteredSongs,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @desc    User likes a song
 * @route   PUT /songs
 * @access  Public
 */
const likeSong = async (req, res) => {
  try {
    // Get user ID dynamically
    const userId = await getFirstAvailableUser();
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({
        status: "error",
        message: "Song ID is required",
      });
    }

    // Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        status: "error",
        message: "Song not found",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if user already liked the song
    if (user.likedSongs.includes(songId)) {
      return res.status(400).json({
        status: "error",
        message: "Song already liked by user",
      });
    }

    // Add song to user's liked songs
    user.likedSongs.push(songId);
    await user.save();

    res.json({
      status: "success",
      message: "Song liked successfully",
      data: {
        userId: user._id,
        songId: songId,
        likedSongs: user.likedSongs,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  searchSongs,
  likeSong,
  getFirstAvailableUser,
};
