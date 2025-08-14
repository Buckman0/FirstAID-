import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();

  async function handle() {
    try {
      await signInWithEmailAndPassword(auth,email,password);
      navigate('/dashboard');
    } catch(e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
      <br />
      <button onClick={handle}>Login</button>
      <p><a href="/reset-password">Forgot password?</a></p>
    </div>
  );
}
