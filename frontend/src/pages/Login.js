import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    identifier: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (mode === "login") {
        await login(form.identifier, form.password);
      } else {
        await register(form.username, form.email, form.password);
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {mode === "login" ? "Log in to Spotify Lite" : "Create an account"}
        </Typography>

        <Tabs
          value={mode}
          onChange={(_, value) => {
            setMode(value);
            setError("");
          }}
          sx={{ mb: 3 }}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#1DB954" } }}
        >
          <Tab label="Log in" value="login" />
          <Tab label="Sign up" value="register" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {mode === "login" ? (
            <TextField
              fullWidth
              label="Username or email"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              autoComplete="username"
              required
              sx={{ mb: 2 }}
            />
          ) : (
            <>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                sx={{ mb: 2 }}
              />
            </>
          )}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            helperText={mode === "register" ? "At least 8 characters" : ""}
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ backgroundColor: "#1DB954", fontWeight: "bold" }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : mode === "login" ? (
              "Log in"
            ) : (
              "Sign up"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
