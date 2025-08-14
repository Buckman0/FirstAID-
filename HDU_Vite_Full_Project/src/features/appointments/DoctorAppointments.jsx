import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig';

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(collection(db, 'appointments'), where('doctorId', '==', user.uid), orderBy('start', 'desc'));
      const snap = await getDocs(q);
      setAppointments(snap.docs.map(d=>({id:d.id, ...d.data()})));
    }
    load();
  }, []);

  return (
    <div>
      <h4>Your appointments</h4>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            {a.patientId} — {a.start?.toDate?.()?.toLocaleString?.()} - {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
