import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from "@mui/material";
import {
  Search,
  Favorite,
  Person,
  MusicNote,
  PlayArrow,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Search Songs",
      description:
        "Find your favorite music by title, artist, genre, or language",
      icon: <Search sx={{ fontSize: 40, color: "#1DB954" }} />,
      path: "/search",
      color: "#1DB954",
    },
    {
      title: "Liked Songs",
      description: "View all the songs you've liked and saved to your library",
      icon: <Favorite sx={{ fontSize: 40, color: "#E91E63" }} />,
      path: "/liked-songs",
      color: "#E91E63",
    },
    {
      title: "User Profile",
      description: "Update your profile information and preferences",
      icon: <Person sx={{ fontSize: 40, color: "#2196F3" }} />,
      path: "/profile",
      color: "#2196F3",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          p: 6,
          mb: 4,
          backgroundColor: "#282828",
          backgroundImage: "linear-gradient(135deg, #1DB954 0%, #191414 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <MusicNote
            sx={{ fontSize: 80, color: "white", mb: 2, opacity: 0.8 }}
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{ color: "white", mb: 2, fontWeight: "bold" }}
          >
            Welcome to Spotify Lite
          </Typography>
          <Typography variant="h6" sx={{ color: "white", mb: 4, opacity: 0.9 }}>
            Discover, like, and organize your favorite music
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={() => navigate("/search")}
            sx={{
              backgroundColor: "white",
              color: "#1DB954",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Start Exploring
          </Button>
        </Box>
      </Paper>

      {/* Features Section */}
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        What You Can Do
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#282828",
                "&:hover": {
                  backgroundColor: "#383838",
                  transform: "translateY(-4px)",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: `0 8px 25px rgba(29, 185, 84, 0.2)`,
                },
                cursor: "pointer",
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: "white", mb: 2 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  {feature.description}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: feature.color,
                    color: feature.color,
                    "&:hover": {
                      borderColor: feature.color,
                      backgroundColor: `${feature.color}20`,
                    },
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Stats */}
      <Paper sx={{ p: 4, mt: 6, backgroundColor: "#282828" }}>
        <Typography
          variant="h5"
          sx={{ color: "white", mb: 3, textAlign: "center" }}
        >
          Your Music Journey
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h3" sx={{ color: "#1DB954", mb: 1 }}>
              ∞
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Songs to Discover
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h3" sx={{ color: "#E91E63", mb: 1 }}>
              ♥
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Songs to Like
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h3" sx={{ color: "#2196F3", mb: 1 }}>
              +
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Artists to Follow
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Home;
