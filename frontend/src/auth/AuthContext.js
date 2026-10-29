import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { apiService, tokenStore } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // True until a stored token has been checked with the server
  const [checking, setChecking] = useState(Boolean(tokenStore.get()));

  useEffect(() => {
    if (tokenStore.get()) {
      apiService
        .getMe()
        .then((res) => setUser(res.data))
        .catch(() => tokenStore.clear())
        .finally(() => setChecking(false));
    }

    const onLogout = () => setUser(null);
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, []);

  const startSession = ({ data }) => {
    tokenStore.set(data.token);
    setUser(data.user);
  };

  const value = {
    user,
    checking,
    login: async (identifier, password) =>
      startSession(await apiService.login(identifier, password)),
    register: async (username, email, password) =>
      startSession(await apiService.register(username, email, password)),
    logout: () => {
      tokenStore.clear();
      setUser(null);
    },
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// Send logged-out visitors to /login, then back to the page they wanted
export const RequireAuth = ({ children }) => {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress sx={{ color: "#1DB954" }} />
      </Box>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};
