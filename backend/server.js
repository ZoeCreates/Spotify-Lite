const app = require("./app");
const connectDB = require("./config/database.js");
const seedData = require("./seedData.js");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Seed data automatically
    console.log("🌱 Seeding database...");
    await seedData();
    console.log("✅ Database seeded successfully!");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Database is ready with sample data`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
