import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Components
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AnalystDashboard from './pages/AnalystDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Agents from './pages/Agents';
import Conversations from './pages/Conversations';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Docs from './pages/Docs';
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
              path="agents"
              element={
                <PrivateRoute>
                  <Agents />
                </PrivateRoute>
              }
            />
            <Route
              path="conversations"
              element={
                <PrivateRoute>
                  <Conversations />
                </PrivateRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <PrivateRoute roles={['analyst']}>
                  <Analytics />
                </PrivateRoute>
              }
            />
            <Route
              path="integrations"
              element={
                <PrivateRoute roles={['analyst']}>
                  <Integrations />
                </PrivateRoute>
              }
            />
            <Route
              path="docs"
              element={
                <PrivateRoute>
                  <Docs />
                </PrivateRoute>
              }
            />
            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Settings />
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