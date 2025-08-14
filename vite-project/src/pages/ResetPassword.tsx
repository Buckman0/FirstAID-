import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset for:', email);
    alert('Password reset email sent!');
    navigate('/');
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input 
          type="email" 
          placeholder="email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <br />
        <button type="submit">Send Reset Email</button>
      </form>
      <p><a href="/">Back to Login</a></p>
    </div>
  );
};

export default ResetPassword;
