import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup attempt:', email, password);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email" 
          placeholder="email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          required
        />
        <br />
        <input 
          type="password" 
          placeholder="password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          required
        />
        <br />
        <input 
          type="password" 
          placeholder="confirm password" 
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} 
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
