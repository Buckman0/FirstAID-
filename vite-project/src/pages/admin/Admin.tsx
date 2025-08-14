import { Routes, Route, Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <Link to="/admin">Overview</Link> | 
        <Link to="/admin/users">Users</Link> | 
        <Link to="/admin/cme">CME</Link> | 
        <Link to="/admin/logs">Logs</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<div>Admin Dashboard</div>} />
        <Route path="/users" element={<div>User Management</div>} />
        <Route path="/cme" element={<div>CME Management</div>} />
        <Route path="/logs" element={<div>System Logs</div>} />
      </Routes>
    </div>
  );
};

export default Admin;
