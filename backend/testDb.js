const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    console.log("🔍 Testing MongoDB connection...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");

    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI environment variable is not set!");
      return;
    }

    // Test connection with timeout
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected successfully!");

    // Test if we can access the database
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(
      "📊 Collections found:",
      collections.map((c) => c.name)
    );

    // Test a simple query
    const Song = require("./models/Song");
    const songCount = await Song.countDocuments();
    console.log("🎵 Songs in database:", songCount);

    const User = require("./models/User");
    const userCount = await User.countDocuments();
    console.log("👤 Users in database:", userCount);
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    console.error("📋 Full error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

testConnection();
