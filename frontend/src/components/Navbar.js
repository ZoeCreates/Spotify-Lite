import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { MusicNote, Search, Person, Favorite } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: <MusicNote /> },
    { path: "/search", label: "Search", icon: <Search /> },
    { path: "/liked-songs", label: "Liked Songs", icon: <Favorite /> },
    { path: "/followed-artists", label: "Followed Artists", icon: <Person /> },
    { path: "/profile", label: "Profile", icon: <Person /> },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#191414" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#1DB954",
          }}
        >
          Spotify Lite
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: location.pathname === item.path ? "#1DB954" : "white",
                "&:hover": {
                  backgroundColor: "rgba(29, 185, 84, 0.1)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
