import React, { useState } from 'react';

export default function TelemedicineRoom({ roomId }) {
  const [useJitsi, setUseJitsi] = useState(true);

  const jitsiUrl = `https://meet.jit.si/${roomId}?userInfo.displayName=HDU`;

  return (
    <div>
      <h4>Telemedicine</h4>
      <p>Room: {roomId}</p>

      {useJitsi ? (
        <div style={{height: '600px'}}>
          <iframe
            title="Jitsi"
            src={jitsiUrl}
            style={{ width: '100%', height: '100%', border: 0 }}
            allow="camera; microphone; fullscreen; display-capture"
          />
        </div>
      ) : (
        <div>
          <p>WebRTC mode (placeholder). For production use native SDK or implement signalling server.</p>
        </div>
      )}

      <div>
        <label><input type="checkbox" checked={useJitsi} onChange={e=>setUseJitsi(e.target.checked)} /> Use Jitsi (recommended)</label>
      </div>
    </div>
  );
}
