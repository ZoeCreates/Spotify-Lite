const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    // Basic artist information
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
      minlength: [2, "Artist name must be at least 2 characters"],
      maxlength: [100, "Artist name cannot exceed 100 characters"],
    },

    // Primary genre (required)
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: [
          "Pop",
          "Rock",
          "Hip-Hop",
          "R&B",
          "Country",
          "Electronic",
          "Jazz",
          "Classical",
          "Alternative",
          "Indie",
        ],
        message: "{VALUE} is not a valid genre",
      },
    },

    // Optional artist biography
    bio: {
      type: String,
      default: "",
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },

    // Profile image URL
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/200x200?text=Artist",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Profile image must be a valid URL",
      },
    },

    // Number of followers (managed by application)
    followers: {
      type: Number,
      default: 0,
      min: [0, "Followers cannot be negative"],
    },

    // Social media links (optional)
    socialLinks: {
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      spotify: { type: String, default: "" },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create indexes for better query performance
artistSchema.index({ name: 1 });
artistSchema.index({ genre: 1 });

module.exports = mongoose.model("Artist", artistSchema);
