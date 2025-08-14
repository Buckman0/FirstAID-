import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login logic
    console.log('Login attempt:', email, password);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p><a href="/reset-password">Forgot password?</a></p>
    </div>
  );
};

export default Login;
