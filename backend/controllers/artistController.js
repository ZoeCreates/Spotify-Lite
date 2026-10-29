const Artist = require("../models/Artist");
const User = require("../models/User");

// ============================================================================
// ARTIST OPERATIONS (as per project requirements)
// ============================================================================

/**
 * @desc    User follows an artist
 * @route   PUT /artists
 * @access  Private
 */
const followArtist = async (req, res) => {
  try {
    // requireAuth guarantees req.user is the logged-in user
    const userId = req.user._id;
    const { artistId } = req.body;

    if (!artistId) {
      return res.status(400).json({
        status: "error",
        message: "Artist ID is required",
      });
    }

    // Check if artist exists
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({
        status: "error",
        message: "Artist not found",
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

    // Check if user already follows the artist
    if (user.followedArtists.includes(artistId)) {
      return res.status(400).json({
        status: "error",
        message: "Artist already followed by user",
      });
    }

    // Add artist to user's followed artists
    user.followedArtists.push(artistId);
    await user.save();

    // Update artist's follower count
    artist.followers += 1;
    await artist.save();

    console.log("👥 User followed artist:");
    console.log(`   User ID: ${user._id}`);
    console.log(`   Artist: ${artist.name} (ID: ${artist._id})`);
    console.log(`   New follower count: ${artist.followers}`);

    res.json({
      status: "success",
      message: "Artist followed successfully",
      data: {
        userId: user._id,
        artistId: artistId,
        artistName: artist.name,
        followedArtists: user.followedArtists,
        artistFollowers: artist.followers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * @desc    Get user's followed artists with full details
 * @route   GET /artists/followed
 * @access  Private
 */
const getFollowedArtists = async (req, res) => {
  try {
    // requireAuth guarantees req.user is the logged-in user
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("followedArtists")
      .select("followedArtists");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    console.log("📋 User's followed artists:");
    user.followedArtists.forEach((artist) => {
      console.log(`   - ${artist.name} (ID: ${artist._id})`);
    });

    res.json({
      status: "success",
      data: user.followedArtists,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  followArtist,
  getFollowedArtists,
};
