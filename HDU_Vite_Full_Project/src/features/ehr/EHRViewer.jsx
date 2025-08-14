import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig';

export default function EHRViewer({ patientId }) {
  const [records, setRecords] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'ehr'), where('patientId', '==', patientId));
      const snap = await getDocs(q);
      setRecords(snap.docs.map(d=>({ id:d.id, ...d.data()})));
    }
    load();
  }, [patientId]);

  async function addRecord() {
    const user = auth.currentUser;
    if (!user) return alert('Login required');
    try {
      await addDoc(collection(db, 'ehr'), {
        patientId,
        doctorId: user.uid,
        notes: newNote,
        createdAt: Timestamp.now()
      });
      setNewNote('');
      alert('Record added.');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
      <h4>EHR</h4>
      <div>
        <textarea value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add note (doctors only)"/>
        <button onClick={addRecord}>Add note</button>
      </div>
      <ul>
        {records.map(r => (
          <li key={r.id}>
            <strong>{r.doctorId}</strong> — {r.createdAt?.toDate?.()?.toLocaleString?.()}
            <p>{r.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
