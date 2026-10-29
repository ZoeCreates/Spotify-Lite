const Song = require("../models/Song");
const User = require("../models/User");
const Artist = require("../models/Artist");

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
 * @access  Private
 */
const likeSong = async (req, res) => {
  try {
    // requireAuth guarantees req.user is the logged-in user
    const userId = req.user._id;
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
};
