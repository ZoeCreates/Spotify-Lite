const mongoose = require("mongoose");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Song = require("./models/Song");

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect("mongodb://localhost:27017/spotify-lite");
    console.log("🔍 Connected to database: spotify-lite\n");

    // Clear existing data
    await User.deleteMany({});
    await Artist.deleteMany({});
    await Song.deleteMany({});
    console.log("🧹 Cleared existing data\n");

    // Create artists with local image URLs
    const artists = await Artist.create([
      {
        name: "Taylor Swift",
        genre: "Pop",
        bio: "American singer-songwriter known for narrative songs about her personal life",
        profileImage: "/images/taylor-swift.jpg",
        followers: 50000000,
        socialLinks: {
          instagram: "https://instagram.com/taylorswift",
          twitter: "https://twitter.com/taylorswift13",
          spotify: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02",
        },
      },
      {
        name: "Drake",
        genre: "Hip-Hop",
        bio: "Canadian rapper, singer, and actor",
        profileImage: "/images/drake.jpg",
        followers: 45000000,
        socialLinks: {
          instagram: "https://instagram.com/champagnepapi",
          twitter: "https://twitter.com/drake",
          spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
        },
      },
      {
        name: "Ed Sheeran",
        genre: "Pop",
        bio: "English singer-songwriter known for his acoustic sound",
        profileImage: "/images/ed-sheeran.jpg",
        followers: 40000000,
        socialLinks: {
          instagram: "https://instagram.com/teddysphotos",
          twitter: "https://twitter.com/edsheeran",
          spotify: "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V",
        },
      },
      {
        name: "BTS",
        genre: "Pop",
        bio: "South Korean boy band that has become a global phenomenon",
        profileImage: "/images/bts.jpg",
        followers: 60000000,
        socialLinks: {
          instagram: "https://instagram.com/bts.bighitofficial",
          twitter: "https://twitter.com/BTS_twt",
          spotify: "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX",
        },
      },
      {
        name: "The Weeknd",
        genre: "R&B",
        bio: "Canadian singer, songwriter, and record producer",
        profileImage: "/images/the-weeknd.jpg",
        followers: 35000000,
        socialLinks: {
          instagram: "https://instagram.com/theweeknd",
          twitter: "https://twitter.com/theweeknd",
          spotify: "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ",
        },
      },
      {
        name: "Ariana Grande",
        genre: "Pop",
        bio: "American singer, songwriter, and actress",
        profileImage: "/images/ariana-grande.jpg",
        followers: 42000000,
        socialLinks: {
          instagram: "https://instagram.com/arianagrande",
          twitter: "https://twitter.com/arianagrande",
          spotify: "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR",
        },
      },
      {
        name: "Post Malone",
        genre: "Hip-Hop",
        bio: "American rapper, singer, and songwriter",
        profileImage: "/images/post-malone.jpg",
        followers: 38000000,
        socialLinks: {
          instagram: "https://instagram.com/postmalone",
          twitter: "https://twitter.com/postmalone",
          spotify: "https://open.spotify.com/artist/246dkjvS1zLTtiykXe5h60",
        },
      },
      {
        name: "Dua Lipa",
        genre: "Pop",
        bio: "English singer and songwriter",
        profileImage: "/images/dua-lipa.jpg",
        followers: 32000000,
        socialLinks: {
          instagram: "https://instagram.com/dualipa",
          twitter: "https://twitter.com/dualipa",
          spotify: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
        },
      },
      {
        name: "Bad Bunny",
        genre: "Latin",
        bio: "Puerto Rican rapper, singer, and songwriter",
        profileImage: "/images/bad-bunny.jpg",
        followers: 48000000,
        socialLinks: {
          instagram: "https://instagram.com/badbunnypr",
          twitter: "https://twitter.com/sanbenito",
          spotify: "https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X",
        },
      },
      {
        name: "Billie Eilish",
        genre: "Alternative",
        bio: "American singer and songwriter",
        profileImage: "/images/billie-eilish.jpg",
        followers: 36000000,
        socialLinks: {
          instagram: "https://instagram.com/billieeilish",
          twitter: "https://twitter.com/billieeilish",
          spotify: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
        },
      },
    ]);
    console.log("🎤 Artists created:", artists.length);

    // Create songs with artist profile images as album covers
    const songs = await Song.create([
      // Taylor Swift songs
      {
        title: "Shake It Off",
        artist: artists[0]._id,
        genre: "Pop",
        language: "English",
        duration: 219,
        albumCover: "/images/taylor-swift.jpg",
        album: "1989",
        playCount: 1500000000,
      },
      {
        title: "Blank Space",
        artist: artists[0]._id,
        genre: "Pop",
        language: "English",
        duration: 231,
        albumCover: "/images/taylor-swift.jpg",
        album: "1989",
        playCount: 1200000000,
      },
      {
        title: "Cruel Summer",
        artist: artists[0]._id,
        genre: "Pop",
        language: "English",
        duration: 178,
        albumCover: "/images/taylor-swift.jpg",
        album: "Lover",
        playCount: 800000000,
      },
      // Drake songs
      {
        title: "God's Plan",
        artist: artists[1]._id,
        genre: "Hip-Hop",
        language: "English",
        duration: 198,
        albumCover: "/images/drake.jpg",
        album: "Scorpion",
        playCount: 1800000000,
      },
      {
        title: "One Dance",
        artist: artists[1]._id,
        genre: "Hip-Hop",
        language: "English",
        duration: 173,
        albumCover: "/images/drake.jpg",
        album: "Views",
        playCount: 1600000000,
      },
      // Ed Sheeran songs
      {
        title: "Shape of You",
        artist: artists[2]._id,
        genre: "Pop",
        language: "English",
        duration: 233,
        albumCover: "/images/ed-sheeran.jpg",
        album: "÷ (Divide)",
        playCount: 2000000000,
      },
      {
        title: "Perfect",
        artist: artists[2]._id,
        genre: "Pop",
        language: "English",
        duration: 263,
        albumCover: "/images/ed-sheeran.jpg",
        album: "÷ (Divide)",
        playCount: 1400000000,
      },
      // BTS songs
      {
        title: "Dynamite",
        artist: artists[3]._id,
        genre: "Pop",
        language: "English",
        duration: 199,
        albumCover: "/images/bts.jpg",
        album: "Dynamite (DayTime Version)",
        playCount: 800000000,
      },
      {
        title: "Butter",
        artist: artists[3]._id,
        genre: "Pop",
        language: "English",
        duration: 164,
        albumCover: "/images/bts.jpg",
        album: "Butter",
        playCount: 900000000,
      },
      // The Weeknd songs
      {
        title: "Blinding Lights",
        artist: artists[4]._id,
        genre: "R&B",
        language: "English",
        duration: 200,
        albumCover: "/images/the-weeknd.jpg",
        album: "After Hours",
        playCount: 2200000000,
      },
      {
        title: "Starboy",
        artist: artists[4]._id,
        genre: "R&B",
        language: "English",
        duration: 230,
        albumCover: "/images/the-weeknd.jpg",
        album: "Starboy",
        playCount: 1100000000,
      },
      // Ariana Grande songs
      {
        title: "Thank U, Next",
        artist: artists[5]._id,
        genre: "Pop",
        language: "English",
        duration: 207,
        albumCover: "/images/ariana-grande.jpg",
        album: "Thank U, Next",
        playCount: 1300000000,
      },
      {
        title: "7 rings",
        artist: artists[5]._id,
        genre: "Pop",
        language: "English",
        duration: 179,
        albumCover: "/images/ariana-grande.jpg",
        album: "Thank U, Next",
        playCount: 1000000000,
      },
      // Post Malone songs
      {
        title: "Rockstar",
        artist: artists[6]._id,
        genre: "Hip-Hop",
        language: "English",
        duration: 218,
        albumCover: "/images/post-malone.jpg",
        album: "beerbongs & bentleys",
        playCount: 1200000000,
      },
      {
        title: "Circles",
        artist: artists[6]._id,
        genre: "Hip-Hop",
        language: "English",
        duration: 215,
        albumCover: "/images/post-malone.jpg",
        album: "Hollywood's Bleeding",
        playCount: 900000000,
      },
      // Dua Lipa songs
      {
        title: "Levitating",
        artist: artists[7]._id,
        genre: "Pop",
        language: "English",
        duration: 203,
        albumCover: "/images/dua-lipa.jpg",
        album: "Future Nostalgia",
        playCount: 1100000000,
      },
      {
        title: "Don't Start Now",
        artist: artists[7]._id,
        genre: "Pop",
        language: "English",
        duration: 183,
        albumCover: "/images/dua-lipa.jpg",
        album: "Future Nostalgia",
        playCount: 800000000,
      },
      // Bad Bunny songs
      {
        title: "Me Porto Bonito",
        artist: artists[8]._id,
        genre: "Latin",
        language: "Spanish",
        duration: 179,
        albumCover: "/images/bad-bunny.jpg",
        album: "Un Verano Sin Ti",
        playCount: 700000000,
      },
      {
        title: "Tití Me Preguntó",
        artist: artists[8]._id,
        genre: "Latin",
        language: "Spanish",
        duration: 242,
        albumCover: "/images/bad-bunny.jpg",
        album: "Un Verano Sin Ti",
        playCount: 600000000,
      },
      // Billie Eilish songs
      {
        title: "bad guy",
        artist: artists[9]._id,
        genre: "Alternative",
        language: "English",
        duration: 194,
        albumCover: "/images/billie-eilish.jpg",
        album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
        playCount: 1500000000,
      },
      {
        title: "Happier Than Ever",
        artist: artists[9]._id,
        genre: "Alternative",
        language: "English",
        duration: 298,
        albumCover: "/images/billie-eilish.jpg",
        album: "Happier Than Ever",
        playCount: 500000000,
      },
    ]);
    console.log("🎵 Songs created:", songs.length);

    // Create users with online profile pictures
    const users = await User.create([
      {
        username: "musiclover",
        email: "musiclover@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        profilePicture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        likedSongs: [songs[0]._id, songs[3]._id, songs[8]._id, songs[9]._id], // Shake It Off, God's Plan, Dynamite, Butter
        followedArtists: [artists[0]._id, artists[1]._id, artists[3]._id], // Taylor Swift, Drake, BTS
        preferences: {
          favoriteGenres: ["Pop", "Hip-Hop"],
          favoriteLanguages: ["English"],
        },
      },
      {
        username: "kpopfan",
        email: "kpopfan@example.com",
        password: "password123",
        firstName: "Sarah",
        lastName: "Kim",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        likedSongs: [songs[7]._id, songs[8]._id, songs[9]._id], // Butter, Dynamite, Butter again
        followedArtists: [artists[3]._id, artists[5]._id], // BTS, Ariana Grande
        preferences: {
          favoriteGenres: ["Pop"],
          favoriteLanguages: ["English", "Korean"],
        },
      },
      {
        username: "edfan",
        email: "edfan@example.com",
        password: "password123",
        firstName: "Mike",
        lastName: "Wilson",
        profilePicture:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        likedSongs: [songs[5]._id, songs[6]._id], // Shape of You, Perfect
        followedArtists: [artists[2]._id, artists[4]._id], // Ed Sheeran, The Weeknd
        preferences: {
          favoriteGenres: ["Pop", "R&B"],
          favoriteLanguages: ["English"],
        },
      },
      {
        username: "latinmusic",
        email: "latinmusic@example.com",
        password: "password123",
        firstName: "Maria",
        lastName: "Garcia",
        profilePicture:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        likedSongs: [songs[17]._id, songs[18]._id], // Me Porto Bonito, Tití Me Preguntó
        followedArtists: [artists[8]._id], // Bad Bunny
        preferences: {
          favoriteGenres: ["Latin"],
          favoriteLanguages: ["Spanish"],
        },
      },
      {
        username: "alternativevibes",
        email: "alternativevibes@example.com",
        password: "password123",
        firstName: "Alex",
        lastName: "Chen",
        profilePicture:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        likedSongs: [songs[19]._id, songs[20]._id], // bad guy, Happier Than Ever
        followedArtists: [artists[9]._id, artists[7]._id], // Billie Eilish, Dua Lipa
        preferences: {
          favoriteGenres: ["Alternative", "Pop"],
          favoriteLanguages: ["English"],
        },
      },
    ]);
    console.log("👤 Users created:", users.length);

    console.log("\n✅ Database seeded successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Artists: ${artists.length}`);
    console.log(`   - Songs: ${songs.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(
      "\n🎵 New artists added: The Weeknd, Ariana Grande, Post Malone, Dua Lipa, Bad Bunny, Billie Eilish"
    );
    console.log("🖼️ Album covers now use artist profile images!");
    console.log("👤 User profile pictures use online images from Unsplash");
    console.log("\n📁 To use your own artist images:");
    console.log("   1. Place artist images in: frontend/public/images/");
    console.log(
      "   2. Use filenames: taylor-swift.jpg, drake.jpg, ed-sheeran.jpg, etc."
    );
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    throw error; // Re-throw to handle in server.js
  } finally {
    // Don't close connection here since server needs it
    // await mongoose.connection.close();
  }
};

// Export the function instead of running it immediately
module.exports = seedData;
