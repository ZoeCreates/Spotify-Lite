import axios from "axios";

// REACT_APP_API_URL wins when set (an empty string means same-origin, used when
// the Express server also serves this build); otherwise localhost for development.
const API_BASE_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:5001";

const TOKEN_KEY = "spotifyLiteToken";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Send the JWT with every request once the user has logged in
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// An expired or invalid token logs the user out everywhere
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && tokenStore.get()) {
      tokenStore.clear();
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Auth APIs
  login: async (identifier, password) => {
    const response = await api.post("/auth/login", { identifier, password });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Song APIs
  searchSongs: async (query, genre, language) => {
    const params = {};
    if (query) params.search = query;
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
  getUserLikedSongs: async () => {
    const response = await api.get("/user/songs");
    return response.data;
  },

  updateUserProfile: async (userData) => {
    const response = await api.put("/user/info", userData);
    return response.data;
  },

  getUserInfo: async () => {
    const response = await api.get("/user/info");
    return response.data;
  },

  // Artist APIs
  getFollowedArtists: async () => {
    const response = await api.get("/artists/followed");
    return response.data;
  },
};

export default api;
