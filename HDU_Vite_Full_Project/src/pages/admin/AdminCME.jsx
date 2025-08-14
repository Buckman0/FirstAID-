import React, {useEffect, useState} from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function AdminCME(){
  const [items,setItems] = useState([]);
  useEffect(()=>{
    async function load(){
      const snap = await getDocs(collection(db,'cme'));
      setItems(snap.docs.map(d=>({ id:d.id, ...d.data()})));
    }
    load();
  },[]);
  async function setStatus(id, status){
    await updateDoc(doc(db,'cme',id), { status });
    alert('Status updated');
  }
  return (
    <div>
      <h3>CME Review</h3>
      <ul>
        {items.map(i=>(
          <li key={i.id}>
            <a href={i.fileUrl} target="_blank" rel="noreferrer">Certificate</a> — {i.userId} — {i.status}
            <button onClick={()=>setStatus(i.id,'approved')}>Approve</button>
            <button onClick={()=>setStatus(i.id,'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
