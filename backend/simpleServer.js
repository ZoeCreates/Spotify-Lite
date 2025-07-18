const express = require("express");
const app = express();

app.use(express.json());

// Simple test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
});
