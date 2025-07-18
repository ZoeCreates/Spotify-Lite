const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    // Song title
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
      minlength: [1, "Song title must be at least 1 character"],
      maxlength: [200, "Song title cannot exceed 200 characters"],
    },

    // Reference to Artist (relationship)
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist is required"],
    },

    // Song genre
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
          "Latin",
        ],
        message: "{VALUE} is not a valid genre",
      },
    },

    // Song language
    language: {
      type: String,
      required: [true, "Language is required"],
      enum: {
        values: [
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
        message: "{VALUE} is not a valid language",
      },
    },

    // Duration in seconds
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
      max: [3600, "Duration cannot exceed 1 hour"],
    },

    // Album cover image URL or local path
    albumCover: {
      type: String,
      default: "https://via.placeholder.com/300x300?text=Album+Cover",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v) || /^\/images\/.+/.test(v);
        },
        message:
          "Album cover must be a valid URL or local path starting with /images/",
      },
    },

    // Release date
    releaseDate: {
      type: Date,
      default: Date.now,
    },

    // Optional album name
    album: {
      type: String,
      default: "",
      maxlength: [200, "Album name cannot exceed 200 characters"],
    },

    // Play count (managed by application)
    playCount: {
      type: Number,
      default: 0,
      min: [0, "Play count cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for search optimization
songSchema.index({ title: "text", album: "text" });
songSchema.index({ artist: 1 });
songSchema.index({ genre: 1 });
songSchema.index({ language: 1 });
songSchema.index({ releaseDate: -1 });

module.exports = mongoose.model("Song", songSchema);
