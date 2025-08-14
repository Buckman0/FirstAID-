import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('patient');
  const navigate = useNavigate();

  async function handle(){
    try{
      const uc = await createUserWithEmailAndPassword(auth,email,password);
      await setDoc(doc(db,'users',uc.user.uid), { email });
      await setDoc(doc(db,'roles',uc.user.uid), { role });
      navigate('/dashboard');
    }catch(e){
      alert(e.message);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <br/>
      <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
      <br/>
      <label>Role </label>
      <select onChange={e=>setRole(e.target.value)} defaultValue="patient">
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="analyst">Analyst</option>
      </select>
      <br/>
      <button onClick={handle}>Create account</button>
    </div>
  );
}
