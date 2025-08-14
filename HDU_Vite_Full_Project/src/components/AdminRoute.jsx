import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function AdminRoute({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    async function check() {
      const user = auth.currentUser;
      if (!user) { setOk(false); return; }
      const snap = await getDoc(doc(db, 'roles', user.uid));
      setOk(snap.exists() && snap.data().role === 'admin');
    }
    check();
  }, []);

  if (ok === null) return <div>Checking admin access...</div>;
  if (!ok) return <Navigate to="/" replace />;
  return children;
}
