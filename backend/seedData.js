const mongoose = require("mongoose");
const User = require("./models/User");
const Artist = require("./models/Artist");
const Song = require("./models/Song");

const seedData = async () => {
  try {
    // 连接到主数据库
    await mongoose.connect("mongodb://localhost:27017/spotify-lite");
    console.log("🔍 Connected to database: spotify-lite\n");

    // 清空现有数据
    await User.deleteMany({});
    await Artist.deleteMany({});
    await Song.deleteMany({});
    console.log("🧹 Cleared existing data\n");

    // 创建艺术家
    const artists = await Artist.create([
      {
        name: "Taylor Swift",
        genre: "Pop",
        bio: "American singer-songwriter known for narrative songs about her personal life",
        profileImage: "https://via.placeholder.com/200x200?text=Taylor+Swift",
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
        profileImage: "https://via.placeholder.com/200x200?text=Drake",
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
        profileImage: "https://via.placeholder.com/200x200?text=Ed+Sheeran",
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
        profileImage: "https://via.placeholder.com/200x200?text=BTS",
        followers: 60000000,
        socialLinks: {
          instagram: "https://instagram.com/bts.bighitofficial",
          twitter: "https://twitter.com/BTS_twt",
          spotify: "https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX",
        },
      },
    ]);
    console.log("🎤 Artists created:", artists.length);

    // 创建歌曲
    const songs = await Song.create([
      {
        title: "Shake It Off",
        artist: artists[0]._id, // Taylor Swift
        genre: "Pop",
        language: "English",
        duration: 219,
        albumCover: "https://via.placeholder.com/300x300?text=1989",
        album: "1989",
        playCount: 1500000000,
      },
      {
        title: "Blank Space",
        artist: artists[0]._id, // Taylor Swift
        genre: "Pop",
        language: "English",
        duration: 231,
        albumCover: "https://via.placeholder.com/300x300?text=1989",
        album: "1989",
        playCount: 1200000000,
      },
      {
        title: "God's Plan",
        artist: artists[1]._id, // Drake
        genre: "Hip-Hop",
        language: "English",
        duration: 198,
        albumCover: "https://via.placeholder.com/300x300?text=Scorpion",
        album: "Scorpion",
        playCount: 1800000000,
      },
      {
        title: "Shape of You",
        artist: artists[2]._id, // Ed Sheeran
        genre: "Pop",
        language: "English",
        duration: 233,
        albumCover: "https://via.placeholder.com/300x300?text=Divide",
        album: "÷ (Divide)",
        playCount: 2000000000,
      },
      {
        title: "Dynamite",
        artist: artists[3]._id, // BTS
        genre: "Pop",
        language: "English",
        duration: 199,
        albumCover: "https://via.placeholder.com/300x300?text=Dynamite",
        album: "Dynamite (DayTime Version)",
        playCount: 800000000,
      },
      {
        title: "Butter",
        artist: artists[3]._id, // BTS
        genre: "Pop",
        language: "English",
        duration: 164,
        albumCover: "https://via.placeholder.com/300x300?text=Butter",
        album: "Butter",
        playCount: 900000000,
      },
    ]);
    console.log("🎵 Songs created:", songs.length);

    // 创建用户
    const users = await User.create([
      {
        username: "musiclover",
        email: "musiclover@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
        profilePicture: "https://via.placeholder.com/150x150?text=John",
        likedSongs: [songs[0]._id, songs[2]._id, songs[4]._id], // Shake It Off, God's Plan, Dynamite
        followedArtists: [artists[0]._id, artists[1]._id], // Taylor Swift, Drake
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
        profilePicture: "https://via.placeholder.com/150x150?text=Sarah",
        likedSongs: [songs[4]._id, songs[5]._id], // Dynamite, Butter
        followedArtists: [artists[3]._id], // BTS
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
        profilePicture: "https://via.placeholder.com/150x150?text=Mike",
        likedSongs: [songs[3]._id], // Shape of You
        followedArtists: [artists[2]._id], // Ed Sheeran
        preferences: {
          favoriteGenres: ["Pop"],
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
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

// 运行数据填充
seedData();
