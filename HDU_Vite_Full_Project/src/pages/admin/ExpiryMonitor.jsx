import React, {useEffect, useState} from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function ExpiryMonitor(){
  const [items,setItems] = useState([]);
  useEffect(()=>{
    async function load(){
      const q = query(collection(db,'documents'));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d=>({id:d.id,...d.data()})));
    }
    load();
  },[]);
  return (
    <div>
      <h3>Document Expiry Monitor</h3>
      <ul>
        {items.map(i=> <li key={i.id}>{i.type} owner:{i.ownerId} expires: {i.expiryDate?.toDate?.()?.toLocaleDateString?.()}</li>)}
      </ul>
    </div>
  );
}
