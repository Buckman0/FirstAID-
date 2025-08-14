import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig';

export default function BookAppointment({ doctorId }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [duration, setDuration] = useState(30);
  const [busy, setBusy] = useState(false);

  async function checkConflict(startTs, endTs) {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      where('status', '==', 'booked'),
      orderBy('start')
    );
    const snap = await getDocs(q);
    for (const d of snap.docs) {
      const a = d.data();
      if (!(endTs <= a.start.toMillis() || startTs >= a.end.toMillis())) {
        return true;
      }
    }
    return false;
  }

  async function handleBook() {
    if (!date) { alert('Pick a date'); return; }
    const [h, m] = time.split(':').map(Number);
    const dt = new Date(date);
    dt.setHours(h, m, 0, 0);
    const startTs = dt.getTime();
    const endTs = startTs + duration * 60 * 1000;
    setBusy(true);
    const conflict = await checkConflict(startTs, endTs);
    if (conflict) {
      alert('Doctor not available at that time. Choose another slot.');
      setBusy(false);
      return;
    }
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'appointments'), {
        patientId: user.uid,
        doctorId,
        start: Timestamp.fromMillis(startTs),
        end: Timestamp.fromMillis(endTs),
        status: 'booked',
        createdAt: Timestamp.now()
      });
      alert('Appointment booked.');
    } catch (e) {
      alert('Failed: ' + e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h4>Book appointment</h4>
      <input type="date" onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <select value={duration} onChange={e=>setDuration(Number(e.target.value))}>
        <option value={15}>15 min</option>
        <option value={30}>30 min</option>
        <option value={60}>60 min</option>
      </select>
      <button onClick={handleBook} disabled={busy}>Book</button>
    </div>
  );
}
