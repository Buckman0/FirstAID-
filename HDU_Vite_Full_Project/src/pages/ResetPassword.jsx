import React, {useState} from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function ResetPassword(){
  const [email,setEmail]=useState('');
  async function handle(){
    try{
      await sendPasswordResetEmail(auth,email);
      alert('Reset email sent');
    }catch(e){
      alert(e.message);
    }
  }
  return (
    <div>
      <h2>Reset password</h2>
      <input placeholder='email' onChange={e=>setEmail(e.target.value)} />
      <button onClick={handle}>Send</button>
    </div>
  );
}
