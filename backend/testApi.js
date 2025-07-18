const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const testAPI = async () => {
  try {
    console.log("🔍 Testing API endpoints...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");

    // Test database connection
    console.log("🔌 Connecting to database...");
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/spotify-lite"
    );
    console.log("✅ Database connected!");

    // Test User model
    console.log("👤 Testing User model...");
    const userCount = await User.countDocuments();
    console.log("Users in database:", userCount);

    if (userCount === 0) {
      console.log("⚠️ No users found - running seed data...");
      const seedData = require("./seedData");
      await seedData();
      console.log("✅ Seed data completed!");
    }

    // Test getting all users
    console.log("📋 Getting all users...");
    const users = await User.find().select("-password");
    console.log("Users found:", users.length);
    console.log("First user:", users[0] ? users[0].username : "None");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("📋 Full error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
};

testAPI();
