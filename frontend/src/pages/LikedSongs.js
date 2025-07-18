import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  Chip,
} from "@mui/material";
import { Favorite, MusicNote } from "@mui/icons-material";
import SongCard from "../components/SongCard";
import { apiService } from "../services/api";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  const fetchLikedSongs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await apiService.getUserLikedSongs();
      setLikedSongs(response.data || []);
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      setError("Failed to load liked songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (songId) => {
    // Remove song from liked songs when unliked
    setLikedSongs((prevSongs) =>
      prevSongs.filter((song) => song._id !== songId)
    );
  };

  const handleFollowArtist = (artistId) => {
    // Update local state to reflect follow
    setLikedSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.artist?._id === artistId
          ? {
              ...song,
              artist: { ...song.artist, isFollowing: !song.artist.isFollowing },
            }
          : song
      )
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress sx={{ color: "#1DB954" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ color: "white", mb: 4 }}>
        Liked Songs
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {likedSongs.length === 0 && !error ? (
        <Paper sx={{ p: 4, backgroundColor: "#282828", textAlign: "center" }}>
          <MusicNote sx={{ fontSize: 64, color: "#535353", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            No Liked Songs Yet
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Start exploring music and like your favorite songs to see them here.
          </Typography>
          <Chip
            icon={<Favorite />}
            label="Go to Search"
            sx={{
              backgroundColor: "#1DB954",
              color: "white",
              "&:hover": { backgroundColor: "#1ed760" },
            }}
            onClick={() => (window.location.href = "/search")}
          />
        </Paper>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Favorite sx={{ color: "#1DB954", mr: 1 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              {likedSongs.length} song{likedSongs.length !== 1 ? "s" : ""} in
              your library
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {likedSongs.map((song) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={song._id}>
                <SongCard
                  song={song}
                  onLike={handleLike}
                  onFollowArtist={handleFollowArtist}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default LikedSongs;
