import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Chip,
} from "@mui/material";
import { Person, PersonRemove, MusicNote } from "@mui/icons-material";
import { apiService } from "../services/api";

const FollowedArtists = () => {
  const [followedArtists, setFollowedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFollowedArtists();
  }, []);

  const fetchFollowedArtists = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await apiService.getFollowedArtists();
      setFollowedArtists(response.data || []);
    } catch (error) {
      console.error("Error fetching followed artists:", error);
      setError("Failed to load followed artists. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollowArtist = async (artistId) => {
    try {
      // Note: This would need an unfollow endpoint
      console.log("Unfollow artist:", artistId);
      // For now, just remove from local state
      setFollowedArtists((prevArtists) =>
        prevArtists.filter((artist) => artist._id !== artistId)
      );
    } catch (error) {
      console.error("Error unfollowing artist:", error);
    }
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
        Followed Artists
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {followedArtists.length === 0 && !error ? (
        <Paper sx={{ p: 4, backgroundColor: "#282828", textAlign: "center" }}>
          <Person sx={{ fontSize: 64, color: "#535353", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            No Followed Artists Yet
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Start following your favorite artists to see them here.
          </Typography>
          <Chip
            icon={<MusicNote />}
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
            <Person sx={{ color: "#1DB954", mr: 1 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              {followedArtists.length} artist
              {followedArtists.length !== 1 ? "s" : ""} followed
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {followedArtists.map((artist) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={artist._id}>
                <Card
                  sx={{
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
                    image={
                      artist.profileImage ||
                      "https://via.placeholder.com/300x300?text=Artist"
                    }
                    alt={artist.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "white", mb: 1 }}
                    >
                      {artist.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {artist.bio}
                    </Typography>

                    <Box
                      sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                    >
                      <Chip
                        label={artist.genre}
                        size="small"
                        sx={{ backgroundColor: "#1DB954", color: "white" }}
                      />
                      <Chip
                        label={`${(artist.followers / 1000000).toFixed(
                          1
                        )}M followers`}
                        size="small"
                        sx={{ backgroundColor: "#535353", color: "white" }}
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PersonRemove />}
                      onClick={() => handleUnfollowArtist(artist._id)}
                      sx={{
                        color: "#E91E63",
                        borderColor: "#E91E63",
                        "&:hover": {
                          borderColor: "#E91E63",
                          backgroundColor: "#E91E6320",
                        },
                      }}
                    >
                      Unfollow
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default FollowedArtists;
