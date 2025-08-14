import React, {useEffect, useState} from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function AdminLogs(){
  const [logs,setLogs] = useState([]);
  useEffect(()=>{
    async function load(){
      const q = query(collection(db,'logs'));
      const snap = await getDocs(q);
      setLogs(snap.docs.map(d=>({id:d.id,...d.data()})));
    }
    load();
  },[]);
  return (
    <div>
      <h3>Audit Logs</h3>
      <ul>
        {logs.map(l=> <li key={l.id}>{l.message || JSON.stringify(l)}</li>)}
      </ul>
    </div>
  );
}
