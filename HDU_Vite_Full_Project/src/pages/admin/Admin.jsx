import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminUsers from './AdminUsers';
import AdminLogs from './AdminLogs';
import AdminCME from './AdminCME';
import ExpiryMonitor from '../admin/ExpiryMonitor';
import AdminRoute from '../../components/AdminRoute';

export default function Admin(){
  return (
    <AdminRoute>
      <div>
        <h2>Admin Portal</h2>
        <nav>
          <Link to="users">Users</Link> | <Link to="logs">Logs</Link> | <Link to="cme">CME</Link> | <Link to="expiry">Expiry</Link>
        </nav>
        <Routes>
          <Route path="users" element={<AdminUsers/>} />
          <Route path="logs" element={<AdminLogs/>} />
          <Route path="cme" element={<AdminCME/>} />
          <Route path="expiry" element={<ExpiryMonitor/>} />
          <Route index element={<div>Select an admin panel</div>} />
        </Routes>
      </div>
    </AdminRoute>
  );
}
