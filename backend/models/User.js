const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User credentials
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    // User profile information
    firstName: {
      type: String,
      default: "",
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      default: "",
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },

    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150x150?text=User",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Profile picture must be a valid URL",
      },
    },

    // Relationships - Array of ObjectIds
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],

    followedArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],

    // User preferences
    preferences: {
      favoriteGenres: [
        {
          type: String,
          enum: [
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
        },
      ],
      favoriteLanguages: [
        {
          type: String,
          enum: [
            "English",
            "Spanish",
            "French",
            "German",
            "Italian",
            "Portuguese",
            "Japanese",
            "Korean",
            "Chinese",
            "Hindi",
          ],
        },
      ],
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ likedSongs: 1 });
userSchema.index({ followedArtists: 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

// Instance method to check if user likes a song
userSchema.methods.hasSongLiked = function (songId) {
  return this.likedSongs.includes(songId);
};

// Instance method to check if user follows an artist
userSchema.methods.isFollowingArtist = function (artistId) {
  return this.followedArtists.includes(artistId);
};

module.exports = mongoose.model("User", userSchema);
