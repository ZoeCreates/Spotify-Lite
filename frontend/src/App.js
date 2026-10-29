import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import LikedSongs from "./pages/LikedSongs";
import FollowedArtists from "./pages/FollowedArtists";
import Login from "./pages/Login";
import { AuthProvider, RequireAuth } from "./auth/AuthContext";

// Create theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DB954", // Spotify green
    },
    secondary: {
      main: "#191414", // Spotify black
    },
    background: {
      default: "#121212",
      paper: "#282828",
    },
  },
  typography: {
    fontFamily: '"Circular", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
        <div className="App">
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={<RequireAuth><UserProfile /></RequireAuth>}
              />
              <Route
                path="/liked-songs"
                element={<RequireAuth><LikedSongs /></RequireAuth>}
              />
              <Route
                path="/followed-artists"
                element={<RequireAuth><FollowedArtists /></RequireAuth>}
              />
            </Routes>
          </Container>
        </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
