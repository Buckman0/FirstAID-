const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const OPENAI_KEY = functions.config().openai ? functions.config().openai.key : null;
const { Configuration, OpenAIApi } = require('openai');

let openai = null;
if (OPENAI_KEY) {
  const configuration = new Configuration({ apiKey: OPENAI_KEY });
  openai = new OpenAIApi(configuration);
}

exports.setUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
  if (!context.auth.token || context.auth.token.role !== 'admin') throw new functions.https.HttpsError('permission-denied', 'Admins only');
  const { uid, role } = data;
  if (!uid || !role) throw new functions.https.HttpsError('invalid-argument', 'Missing uid/role');
  await admin.firestore().doc(`roles/${uid}`).set({ role }, { merge: true });
  await admin.auth().setCustomUserClaims(uid, { role });
  return { success: true };
});

exports.aiChat = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated','Login required');
  if (!openai) throw new functions.https.HttpsError('failed-precondition','OpenAI key not configured');
  const messages = data.messages || [];
  const system = { role: 'system', content: 'You are HDU assistant. Be helpful and concise.' };
  const chatMessages = [system, ...messages.map(m => ({ role: m.role, content: m.text }))];
  const res = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: chatMessages,
    max_tokens: 600
  });
  const reply = res.data.choices?.[0]?.message?.content || 'No reply';
  // optional: log to firestore
  await admin.firestore().collection('logs').add({ message: 'aiChat used', user: context.auth.uid, createdAt: admin.firestore.Timestamp.now() });
  return { reply };
});

exports.documentExpiryCheck = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const db = admin.firestore();
  const now = admin.firestore.Timestamp.now();
  const in30 = admin.firestore.Timestamp.fromMillis(Date.now() + 30*24*60*60*1000);
  const snap = await db.collection('documents').where('expiryDate', '<=', in30).get();
  const ops = [];
  snap.forEach(s => {
    const d = s.data();
    ops.push(db.collection('notifications').add({
      ownerId: d.ownerId,
      message: `Document ${d.type} expires soon`,
      createdAt: admin.firestore.Timestamp.now()
    }));
  });
  await Promise.all(ops);
  return null;
});
