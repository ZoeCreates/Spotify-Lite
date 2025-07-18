const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const testConnection = async () => {
  try {
    console.log("🔍 Testing database connection...");
    console.log(
      "📡 Connection URI:",
      process.env.MONGODB_URI || "mongodb://localhost:27017/spotify-lite"
    );

    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/spotify-lite",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Database connection successful!");
    console.log(`📍 Connected to: ${conn.connection.host}`);
    console.log(`🗄️  Database: ${conn.connection.name}`);
    console.log(`🔌 Port: ${conn.connection.port}`);

    // Test a simple operation
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`📚 Collections in database: ${collections.length}`);
    if (collections.length > 0) {
      console.log(
        "📋 Collection names:",
        collections.map((c) => c.name).join(", ")
      );
    }

    // Close the connection
    await mongoose.connection.close();
    console.log("🔒 Connection closed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("🔍 Error details:", error.message);

    // Provide helpful troubleshooting tips
    console.log("\n🔧 Troubleshooting tips:");
    console.log("1. Make sure MongoDB is running on your machine");
    console.log("2. Check if MONGODB_URI is set in your .env file");
    console.log("3. Verify the connection string format");
    console.log("4. Ensure network connectivity to the database");

    process.exit(1);
  }
};

// Run the test
testConnection();
