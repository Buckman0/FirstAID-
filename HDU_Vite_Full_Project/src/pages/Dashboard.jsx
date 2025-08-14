import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Link, Routes, Route } from 'react-router-dom';
import DashboardDoctor from './DashboardDoctor';
import DashboardPatient from './DashboardPatient';
import DashboardAnalyst from './DashboardAnalyst';

export default function Dashboard(){
  const [role,setRole]=useState(null);

  useEffect(()=>{
    async function load() {
      const u = auth.currentUser;
      if (!u) return;
      const snap = await getDoc(doc(db,'roles',u.uid));
      if (snap.exists()) setRole(snap.data().role);
    }
    const t = setTimeout(load, 300);
    return ()=>clearTimeout(t);
  },[]);

  if (!role) return <div>Loading dashboard…</div>;

  return (
    <div>
      <h2>Dashboard ({role})</h2>
      <nav>
        <Link to="doctor">Doctor</Link> | <Link to="patient">Patient</Link> | <Link to="analyst">Analyst</Link>
      </nav>
      <Routes>
        <Route path="doctor" element={<DashboardDoctor/>} />
        <Route path="patient" element={<DashboardPatient/>} />
        <Route path="analyst" element={<DashboardAnalyst/>} />
      </Routes>
    </div>
  );
}
