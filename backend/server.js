const app = require("./app");
const connectDB = require("./config/database.js");
const seedData = require("./seedData.js");
const Song = require("./models/Song");
const User = require("./models/User");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    console.log("🚀 Starting server...");
    console.log("📊 Environment:", process.env.NODE_ENV);
    console.log("🔗 MongoDB URI:", process.env.MONGODB_URI ? "Set" : "Not set");

    // Tokens cannot be signed or verified without a secret, so refuse to start
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET must be set");
    }

    // Connect to database
    console.log("🔌 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected!");

    // One-time migration: hash any passwords saved before bcrypt was added
    const legacyUsers = await User.find({
      password: { $not: /^\$2[aby]\$/ },
    }).select("+password");
    for (const user of legacyUsers) {
      user.markModified("password");
      // Skip validation: old accounts may predate the 8-character minimum
      await user.save({ validateBeforeSave: false });
    }
    if (legacyUsers.length) {
      console.log(`🔐 Hashed ${legacyUsers.length} legacy plaintext passwords`);
    }

    // Seed only an empty database, so restarts keep registered accounts
    try {
      if ((await Song.estimatedDocumentCount()) > 0) {
        console.log("🌱 Database already has data, skipping seed");
      } else {
        console.log("🌱 Seeding database...");
        await seedData();
        console.log("✅ Database seeded successfully!");
      }
    } catch (seedError) {
      console.error("⚠️ Seed data failed:", seedError.message);
      console.log("🔄 Continuing without seed data...");
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Database is ready`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    console.error("📋 Error details:", error.stack);
    process.exit(1);
  }
};

// Export for Vercel
module.exports = app;

// Start server if running directly (not on Vercel)
if (require.main === module) {
  startServer();
}
