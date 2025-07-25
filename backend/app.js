const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware (development)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Spotify Lite API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Spotify Lite API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      users: "/user",
      songs: "/songs",
      artists: "/artists",
    },
    timestamp: new Date().toISOString(),
  });
});

// Routes without API prefix
app.use("/user", require("./routes/userRoutes"));
app.use("/songs", require("./routes/songRoutes"));
app.use("/artists", require("./routes/artistRoutes"));

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
