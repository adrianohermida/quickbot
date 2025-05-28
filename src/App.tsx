import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Components
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AnalystDashboard from './pages/AnalystDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute roles={['analyst']}>
                  <AnalystDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="client"
              element={
                <PrivateRoute roles={['client']}>
                  <ClientDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;