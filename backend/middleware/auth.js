const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_ALGORITHM = "HS256";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

// Issue a short-lived access token whose subject is the user's id
const signToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, getSecret(), {
    algorithm: JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

const unauthorized = (res, message) =>
  res.status(401).json({ status: "error", message });

/**
 * Require a valid "Authorization: Bearer <token>" header.
 * On success the authenticated user is available as req.user.
 */
const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return unauthorized(res, "Authentication required");
  }

  let payload;
  try {
    // Pin the algorithm so tokens signed with "none" or another alg are rejected
    payload = jwt.verify(token, getSecret(), { algorithms: [JWT_ALGORITHM] });
  } catch (error) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return unauthorized(res, message);
  }

  try {
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      return unauthorized(res, "Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireAuth, signToken };
