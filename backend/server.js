const app = require("./app");
const connectDB = require("./config/database.js");
const seedData = require("./seedData.js");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    console.log("🚀 Starting server...");
    console.log("📊 Environment:", process.env.NODE_ENV);
    console.log("🔗 MongoDB URI:", process.env.MONGODB_URI ? "Set" : "Not set");

    // Connect to database
    console.log("🔌 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected!");

    // Seed data automatically
    console.log("🌱 Seeding database...");
    try {
      await seedData();
      console.log("✅ Database seeded successfully!");
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
