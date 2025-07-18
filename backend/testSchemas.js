const mongoose = require("mongoose");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Song = require("./models/Song");

const testSchemas = async () => {
  try {
    // Connect to database
    await mongoose.connect("mongodb://localhost:27017/spotify-lite-test");

    // Clear existing test data
    await Artist.deleteMany({
      name: { $in: ["Test Artist", "Test Artist 2"] },
    });
    await Song.deleteMany({ title: { $in: ["Test Song", "Test Song 2"] } });
    await User.deleteMany({ username: { $in: ["testuser", "testuser2"] } });
    console.log("🧹 Cleared existing test data");

    // Create test artist
    const artist = new Artist({
      name: "Test Artist 2",
      genre: "Pop",
      bio: "Test bio for the artist",
    });
    await artist.save();
    console.log("✅ Artist created:", artist.name);

    // Create test song
    const song = new Song({
      title: "Test Song 2",
      artist: artist._id,
      genre: "Pop",
      language: "English",
      duration: 180,
    });
    await song.save();
    console.log("✅ Song created:", song.title);

    // Create test user
    const user = new User({
      username: "testuser2",
      email: "test2@example.com",
      password: "password123",
      likedSongs: [song._id],
      followedArtists: [artist._id],
    });
    await user.save();
    console.log("✅ User created:", user.username);

    // Test relationships
    const userWithRefs = await User.findById(user._id)
      .populate("likedSongs")
      .populate("followedArtists");
    console.log("✅ User with populated references:", {
      username: userWithRefs.username,
      likedSongs: userWithRefs.likedSongs.map((s) => s.title),
      followedArtists: userWithRefs.followedArtists.map((a) => a.name),
    });

    console.log("✅ All schemas working correctly!");
  } catch (error) {
    console.error("❌ Schema test failed:", error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run test
testSchemas();
