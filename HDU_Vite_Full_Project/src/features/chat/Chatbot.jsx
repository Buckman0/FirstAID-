import React, {useState} from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../../firebase/firebaseConfig';

export default function Chatbot({ context }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const functions = getFunctions();

  async function send() {
    if (!input) return;
    const txt = input;
    setMessages(m => [...m, { role: 'user', text: txt }]);
    setInput('');
    try {
      const aiChat = httpsCallable(functions, 'aiChat');
      const res = await aiChat({ messages: [...messages, { role: 'user', text: txt }], context });
      setMessages(m => [...m, { role: 'assistant', text: res.data.reply }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', text: 'Error: ' + e.message }]);
    }
  }

  return (
    <div>
      <h4>AI Assistant</h4>
      <div style={{border:'1px solid #ddd', padding:8, maxHeight:300, overflow:'auto'}}>
        {messages.map((m,i)=>(<div key={i}><strong>{m.role}:</strong> {m.text}</div>))}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask the assistant..." />
      <button onClick={send}>Send</button>
    </div>
  );
}
