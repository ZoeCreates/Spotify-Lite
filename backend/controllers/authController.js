const User = require("../models/User");
const { signToken } = require("../middleware/auth");

// Same response for an unknown user and a wrong password, so attackers
// cannot use login to discover which accounts exist
const INVALID_CREDENTIALS = "Invalid username/email or password";

const authResponse = (res, statusCode, user) =>
  res.status(statusCode).json({
    status: "success",
    data: { token: signToken(user), user },
  });

/**
 * @desc    Create an account and return an access token
 * @route   POST /auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Reject non-strings so query operators like {"$ne": null} cannot reach MongoDB
    if (![username, email, password].every((v) => typeof v === "string" && v)) {
      return res.status(400).json({
        status: "error",
        message: "Username, email, and password are required",
      });
    }

    const existing = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });
    if (existing) {
      return res.status(409).json({
        status: "error",
        message: "Username or email is already registered",
      });
    }

    const user = await User.create({ username, email, password });
    authResponse(res, 201, user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      return res.status(400).json({ status: "error", message });
    }
    res.status(500).json({ status: "error", message: "Registration failed" });
  }
};

/**
 * @desc    Log in with username or email and return an access token
 * @route   POST /auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (typeof identifier !== "string" || typeof password !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Username/email and password are required",
      });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
    }).select("+password");

    if (!user || !user.isActive || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: "error", message: INVALID_CREDENTIALS });
    }

    user.lastLogin = new Date();
    await user.save();
    authResponse(res, 200, user);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Login failed" });
  }
};

/**
 * @desc    Return the logged-in user
 * @route   GET /auth/me
 * @access  Private
 */
const me = (req, res) => {
  res.json({ status: "success", data: req.user });
};

module.exports = { register, login, me };
