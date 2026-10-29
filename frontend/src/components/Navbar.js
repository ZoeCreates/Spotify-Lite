import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  MusicNote,
  Search,
  Person,
  Favorite,
  Login,
  Logout,
} from "@mui/icons-material";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
          {user ? (
            <Button
              startIcon={<Logout />}
              onClick={() => {
                logout();
                navigate("/");
              }}
              sx={{ color: "white" }}
            >
              Log out ({user.username})
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<Login />}
              sx={{
                color: location.pathname === "/login" ? "#1DB954" : "white",
              }}
            >
              Log in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
