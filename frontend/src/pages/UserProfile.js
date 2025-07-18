import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar,
  Grid,
} from "@mui/material";
import { Person, Save } from "@mui/icons-material";
import { apiService } from "../services/api";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await apiService.getUserInfo();
        setUserInfo(res.data);
      } catch (e) {
        // handle error
      }
    };
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only include non-empty fields
    const updateData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim()) {
        updateData[key] = formData[key];
      }
    });

    if (Object.keys(updateData).length === 0) {
      setError("Please fill in at least one field to update");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await apiService.updateUserProfile(updateData);
      setSuccess("Profile updated successfully!");

      // Clear password field after successful update
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Update error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ color: "white", mb: 4 }}>
        User Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Avatar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: "#282828", textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                backgroundColor: "#1DB954",
                fontSize: "3rem",
              }}
            >
              <Person sx={{ fontSize: "3rem" }} />
            </Avatar>
            {userInfo && (
              <>
                <Typography variant="h6" sx={{ color: "white", mt: 2 }}>
                  {userInfo.username}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {userInfo.email}
                </Typography>
              </>
            )}
            <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
              Profile Settings
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Update your account information below
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, backgroundColor: "#282828" }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
              Edit Profile Information
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    helperText="Leave blank to keep current password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#535353" },
                        "&:hover fieldset": { borderColor: "#1DB954" },
                        "&.Mui-focused fieldset": { borderColor: "#1DB954" },
                      },
                      "& .MuiInputLabel-root": { color: "text.secondary" },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiFormHelperText-root": { color: "text.secondary" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <Save />
                      )
                    }
                    disabled={loading}
                    sx={{
                      backgroundColor: "#1DB954",
                      "&:hover": { backgroundColor: "#1ed760" },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
