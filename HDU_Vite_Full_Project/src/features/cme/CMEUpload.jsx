import React, {useState} from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { storage, db, auth } from '../../firebase/firebaseConfig';

export default function CMEUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    const user = auth.currentUser;
    if (!user) return alert('Please login');
    if (!file) return alert('Choose file');
    setUploading(true);
    const storageRef = ref(storage, `cme/${user.uid}/${Date.now()}_${file.name}`);
    const task = uploadBytesResumable(storageRef, file);
    task.on('state_changed', null, err => {
      setUploading(false);
      alert(err.message);
    }, async () => {
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db,'cme'), {
        userId: user.uid,
        fileUrl: url,
        status: 'pending',
        uploadedAt: Timestamp.now()
      });
      setUploading(false);
      alert('Uploaded for review');
    });
  }

  return (
    <div>
      <h4>Upload CME Certificate</h4>
      <input type="file" onChange={e=>setFile(e.target.files?.[0])} />
      <button onClick={handleUpload} disabled={uploading}>Upload</button>
    </div>
  );
}
