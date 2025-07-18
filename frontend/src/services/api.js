import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions
export const apiService = {
  // Song APIs
  searchSongs: async (query, genre, language) => {
    const params = {};
    if (query) params.search = query; // 改为 search 参数
    if (genre) params.genre = genre;
    if (language) params.language = language;

    const response = await api.get("/songs", { params });
    return response.data;
  },

  likeSong: async (songId) => {
    const response = await api.put("/songs", { songId });
    return response.data;
  },

  // Artist APIs
  followArtist: async (artistId) => {
    const response = await api.put("/artists", { artistId });
    return response.data;
  },

  // User APIs
  getUserLikedSongs: async (username) => {
    const params = username ? { username } : {};
    const response = await api.get("/user/songs", { params });
    return response.data;
  },

  updateUserProfile: async (userData, username) => {
    const params = username ? { username } : {};
    const response = await api.put("/user/info", userData, { params });
    return response.data;
  },

  getUserInfo: async (username) => {
    const params = username ? { username } : {};
    const response = await api.get("/user/info", { params });
    return response.data;
  },

  // Artist APIs
  getFollowedArtists: async () => {
    const response = await api.get("/artists/followed");
    return response.data;
  },
};

export default api;
