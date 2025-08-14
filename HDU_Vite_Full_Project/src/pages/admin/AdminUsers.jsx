import React, {useEffect, useState} from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function AdminUsers(){
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    async function load(){
      const snap = await getDocs(collection(db,'users'));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  },[]);
  async function changeRole(uid,role){
    await updateDoc(doc(db,'roles',uid), { role });
    alert('Role updated (client change). Use Cloud Function for secure updates.');
  }
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(u=>(
          <li key={u.id}>
            {u.email || u.id} — {u.role || 'n/a'}
            <select defaultValue={u.role || 'patient'} onChange={e=>changeRole(u.id,e.target.value)}>
              <option value='patient'>Patient</option>
              <option value='doctor'>Doctor</option>
              <option value='analyst'>Analyst</option>
              <option value='admin'>Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
