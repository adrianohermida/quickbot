import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Conversations from './pages/Conversations';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;