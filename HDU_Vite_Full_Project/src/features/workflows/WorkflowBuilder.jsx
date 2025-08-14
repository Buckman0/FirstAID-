import React, {useState, useEffect} from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export default function WorkflowBuilder(){
  const [name,setName] = useState('');
  const [templates,setTemplates] = useState([]);
  useEffect(()=>{
    async function load(){
      const snap = await getDocs(collection(db,'workflows'));
      setTemplates(snap.docs.map(d=>({id:d.id,...d.data()})));
    }
    load();
  },[]);
  async function create(){
    if(!name) return alert('Name required');
    await addDoc(collection(db,'workflows'), { name, createdAt: new Date(), nodes: []});
    alert('Created');
  }
  return (
    <div>
      <h4>Workflow Builder</h4>
      <input placeholder="Workflow name" value={name} onChange={e=>setName(e.target.value)} />
      <button onClick={create}>Create</button>
      <ul>
        {templates.map(t=> <li key={t.id}>{t.name}</li>)}
      </ul>
    </div>
  );
}
