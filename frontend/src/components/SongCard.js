import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { Favorite, FavoriteBorder, PersonAdd } from "@mui/icons-material";
import { apiService } from "../services/api";
import { placeholderImage, fallbackOnError } from "../services/placeholder";
import { useAuth } from "../auth/AuthContext";

const SongCard = ({ song, onLike, onFollowArtist }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Liking and following need an account, so send visitors to log in first
  const requireLogin = () => {
    if (user) return false;
    navigate("/login", { state: { from: location } });
    return true;
  };

  const handleLike = async () => {
    if (requireLogin()) return;
    try {
      setLoading(true);
      await apiService.likeSong(song._id);
      setIsLiked(!isLiked);
      if (onLike) onLike(song._id);
    } catch (error) {
      console.error("Error liking song:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowArtist = async () => {
    if (requireLogin()) return;
    try {
      setLoading(true);
      await apiService.followArtist(song.artist._id);
      setIsFollowing(!isFollowing);
      if (onFollowArtist) onFollowArtist(song.artist._id);
    } catch (error) {
      console.error("Error following artist:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#282828",
        "&:hover": {
          backgroundColor: "#383838",
          transform: "translateY(-2px)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={song.albumCover || placeholderImage(song.title)}
        alt={song.title}
        onError={fallbackOnError(song.title)}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: "white", mb: 1 }}>
          {song.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {song.artist?.name || "Unknown Artist"}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={song.genre}
            size="small"
            sx={{ backgroundColor: "#1DB954", color: "white" }}
          />
          <Chip
            label={song.language}
            size="small"
            sx={{ backgroundColor: "#535353", color: "white" }}
          />
          <Chip
            label={formatDuration(song.duration)}
            size="small"
            sx={{ backgroundColor: "#535353", color: "white" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleLike}
            disabled={loading}
            sx={{
              color: isLiked ? "#1DB954" : "white",
              "&:hover": { color: "#1DB954" },
            }}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <Button
            variant="outlined"
            size="small"
            startIcon={<PersonAdd />}
            onClick={handleFollowArtist}
            disabled={loading}
            sx={{
              color: isFollowing ? "#1DB954" : "white",
              borderColor: isFollowing ? "#1DB954" : "white",
              "&:hover": {
                borderColor: "#1DB954",
                color: "#1DB954",
              },
            }}
          >
            {isFollowing ? "Following" : "Follow Artist"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SongCard;
