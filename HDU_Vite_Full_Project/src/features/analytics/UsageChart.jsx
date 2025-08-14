import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UsageChart(){
  const [data,setData] = useState({labels:[], datasets:[]});

  useEffect(()=>{
    async function load(){
      const snap = await getDocs(collection(db,'appointments'));
      const counts = {};
      snap.docs.forEach(d=>{
        const s = d.data().start?.toDate?.();
        if (!s) return;
        const day = s.toISOString().slice(0,10);
        counts[day] = (counts[day] || 0) + 1;
      });
      const labels = Object.keys(counts).sort();
      const vals = labels.map(l=>counts[l]);
      setData({
        labels,
        datasets: [{ label: 'Appointments per day', data: vals }]
      });
    }
    load();
  },[]);

  return <div>
    <h4>Usage</h4>
    <Bar data={data} />
  </div>;
}
