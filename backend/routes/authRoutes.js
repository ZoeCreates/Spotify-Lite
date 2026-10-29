const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

// Slow down password guessing: 10 attempts per IP every 15 minutes
const credentialLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === "test",
  message: {
    status: "error",
    message: "Too many attempts, please try again later",
  },
});

// POST /auth/register - Create an account
router.post("/register", credentialLimiter, register);

// POST /auth/login - Exchange credentials for a JWT
router.post("/login", credentialLimiter, login);

// GET /auth/me - Current user from the token
router.get("/me", requireAuth, me);

module.exports = router;
