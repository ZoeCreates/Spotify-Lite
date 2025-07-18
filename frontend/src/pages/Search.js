import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import SongCard from "../components/SongCard";
import { apiService } from "../services/api";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [songs, setSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genres = [
    "Pop",
    "Hip-Hop",
    "Rock",
    "R&B",
    "Country",
    "Electronic",
    "Jazz",
    "Classical",
    "Alternative",
    "Indie",
    "Latin",
  ];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Korean",
    "Japanese",
    "Italian",
    "Portuguese",
    "Chinese",
    "Hindi",
  ];

  // Load all songs when component mounts
  useEffect(() => {
    loadAllSongs();
  }, []);

  const loadAllSongs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await apiService.searchSongs("", "", "");
      setAllSongs(response.data || []);
      setSongs(response.data || []);
    } catch (error) {
      console.error("Error loading songs:", error);
      setError("Failed to load songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery && !selectedGenre && !selectedLanguage) {
      // If no filters, show all songs
      setSongs(allSongs);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await apiService.searchSongs(
        searchQuery,
        selectedGenre,
        selectedLanguage
      );
      setSongs(response.data || []);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to search songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (songId) => {
    // Update local state to reflect like
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song._id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    );
    setAllSongs((prevSongs) =>
      prevSongs.map((song) =>
        song._id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    );
  };

  const handleFollowArtist = (artistId) => {
    // Update local state to reflect follow
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.artist?._id === artistId
          ? {
              ...song,
              artist: { ...song.artist, isFollowing: !song.artist.isFollowing },
            }
          : song
      )
    );
    setAllSongs((prevSongs) =>
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

  // Auto-search when filters change
  useEffect(() => {
    if (searchQuery || selectedGenre || selectedLanguage) {
      const timeoutId = setTimeout(handleSearch, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // If no filters, show all songs
      setSongs(allSongs);
    }
  }, [searchQuery, selectedGenre, selectedLanguage, allSongs]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ color: "white", mb: 4 }}>
        Search Songs
      </Typography>

      {/* Search Bar and Filters */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: "#282828" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search songs or artists"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#535353" },
                  "&:hover fieldset": { borderColor: "#1DB954" },
                  "&.Mui-focused fieldset": { borderColor: "#1DB954" },
                },
                "& .MuiInputLabel-root": { color: "text.secondary" },
                "& .MuiInputBase-input": { color: "white" },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
                Genre
              </InputLabel>
              <Select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                sx={{
                  color: "white",
                  minHeight: "56px",
                  minWidth: "180px",
                  fontSize: "1.1rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#535353",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1DB954",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1DB954",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "300px",
                      backgroundColor: "#282828",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        fontSize: "1.1rem",
                        padding: "12px 16px",
                        "&:hover": { backgroundColor: "#383838" },
                        "&.Mui-selected": {
                          backgroundColor: "#1DB954",
                          "&:hover": { backgroundColor: "#1ed760" },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem sx={{ fontSize: "1.1rem" }} value="">
                  All Genres
                </MenuItem>
                {genres.map((genre) => (
                  <MenuItem
                    sx={{ fontSize: "1.1rem" }}
                    key={genre}
                    value={genre}
                  >
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
                Language
              </InputLabel>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                sx={{
                  color: "white",
                  minHeight: "56px",
                  minWidth: "180px",
                  fontSize: "1.1rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#535353",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1DB954",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1DB954",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "300px",
                      backgroundColor: "#282828",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        fontSize: "1.1rem",
                        padding: "12px 16px",
                        "&:hover": { backgroundColor: "#383838" },
                        "&.Mui-selected": {
                          backgroundColor: "#1DB954",
                          "&:hover": { backgroundColor: "#1ed760" },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem sx={{ fontSize: "1.1rem" }} value="">
                  All Languages
                </MenuItem>
                {languages.map((language) => (
                  <MenuItem
                    sx={{ fontSize: "1.1rem" }}
                    key={language}
                    value={language}
                  >
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress sx={{ color: "#1DB954" }} />
        </Box>
      )}

      {/* Results */}
      {!loading && songs.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
            {searchQuery || selectedGenre || selectedLanguage
              ? `Found ${songs.length} song${songs.length !== 1 ? "s" : ""}`
              : `All Songs (${songs.length})`}
          </Typography>
          <Grid container spacing={3}>
            {songs.map((song) => (
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

      {/* No Results */}
      {!loading &&
        !error &&
        songs.length === 0 &&
        (searchQuery || selectedGenre || selectedLanguage) && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              No songs found. Try adjusting your search criteria.
            </Typography>
          </Box>
        )}
    </Box>
  );
};

export default Search;
