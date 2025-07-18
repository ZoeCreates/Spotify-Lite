const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    console.log("🔍 Testing database connection...");
    console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Set" : "Not set");

    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/spotify-lite"
    );
    console.log("✅ Database connected successfully!");

    // Test if we can query the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📊 Collections found:",
      collections.map((c) => c.name)
    );

    // Test User model
    const User = require("./models/User");
    const userCount = await User.countDocuments();
    console.log("👤 Users in database:", userCount);

    if (userCount === 0) {
      console.log("⚠️ No users found - seed data may not have run");
    } else {
      console.log("✅ Users found - seed data ran successfully");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

testConnection();
