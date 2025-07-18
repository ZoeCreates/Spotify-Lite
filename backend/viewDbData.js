const mongoose = require("mongoose");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Song = require("./models/Song");

const viewDatabaseData = async () => {
  try {
    // Connect to database
    await mongoose.connect("mongodb://localhost:27017/spotify-lite");
    console.log("🔍 Connected to database: spotify-lite\n");

    // Get all artists
    const artists = await Artist.find({});
    console.log("🎤 ARTISTS (" + artists.length + "):");
    console.log("=".repeat(50));
    artists.forEach((artist, index) => {
      console.log(`${index + 1}. ${artist.name}`);
      console.log(`   Genre: ${artist.genre}`);
      console.log(`   Bio: ${artist.bio}`);
      console.log(`   Followers: ${artist.followers}`);
      console.log(`   Created: ${artist.createdAt.toLocaleDateString()}`);
      console.log("");
    });

    // Get all songs
    const songs = await Song.find({}).populate("artist", "name");
    console.log("🎵 SONGS (" + songs.length + "):");
    console.log("=".repeat(50));
    songs.forEach((song, index) => {
      console.log(`${index + 1}. ${song.title}`);
      console.log(`   Artist: ${song.artist.name}`);
      console.log(`   Genre: ${song.genre}`);
      console.log(`   Duration: ${song.duration}s`);
      console.log(`   Language: ${song.language}`);
      console.log(`   Play Count: ${song.playCount}`);
      console.log("");
    });

    // Get all users
    const users = await User.find({})
      .populate("likedSongs", "title")
      .populate("followedArtists", "name");
    console.log("👤 USERS (" + users.length + "):");
    console.log("=".repeat(50));
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username} (${user.email})`);
      console.log(
        `   Liked Songs: ${
          user.likedSongs.map((s) => s.title).join(", ") || "None"
        }`
      );
      console.log(
        `   Followed Artists: ${
          user.followedArtists.map((a) => a.name).join(", ") || "None"
        }`
      );
      console.log(`   Active: ${user.isActive ? "Yes" : "No"}`);
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
      console.log("");
    });

    console.log("✅ Database data displayed successfully!");
  } catch (error) {
    console.error("❌ Error viewing database data:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the viewer
viewDatabaseData();
