import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Admin from './pages/admin/Admin';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>HDU</h1>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}
