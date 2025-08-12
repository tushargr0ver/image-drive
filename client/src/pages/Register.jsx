import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
      console.error(err?.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 8 } }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 480 }} component="form" onSubmit={onSubmit}>
        <Typography variant="h2" sx={{ fontSize: 26, mb: 2 }}>Register</Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            fullWidth
            required
          />
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button type="submit" disabled={submitting} fullWidth>
            {submitting ? 'Creating account…' : 'Register'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Register;
