import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Box, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Folder from './pages/Folder';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, initializing } = useContext(AuthContext);
  if (initializing) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <CircularProgress size={32} />
      </Box>
    );
  }
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="xl" sx={{ pt: 3, pb: 6 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/folder/:folderId" element={<ProtectedRoute><Folder /></ProtectedRoute>} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;