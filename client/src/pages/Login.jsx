import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography, Stack } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
      console.error(err?.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 8 } }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420 }} component="form" onSubmit={onSubmit}>
        <Typography variant="h2" sx={{ fontSize: 26, mb: 2 }}>Login</Typography>
        <Stack spacing={2}>
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
            {submitting ? 'Logging in…' : 'Login'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
