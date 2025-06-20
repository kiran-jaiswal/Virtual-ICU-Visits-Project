import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import DoctorDashboard from './components/DoctorDashboard';
import FamilyDashboard from './components/FamilyDashboard';
import VideoCall from './components/VideoCall';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/doctor-dashboard"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/family-dashboard"
              element={
                <ProtectedRoute allowedRoles={['family']}>
                  <FamilyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/video-call/:roomId"
              element={
                <ProtectedRoute allowedRoles={['doctor', 'family']}>
                  <VideoCall />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;