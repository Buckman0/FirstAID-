# HDU Web (Vite) — Full Project Bundle

This bundle contains a Vite React frontend and a Cloud Functions folder for Firebase.

Quick start:
1. Copy `.env.example` to `.env.local` and fill in your Firebase config values.
2. Install dependencies:
   - Frontend: `npm install`
   - Functions: `cd functions && npm install`
3. Run locally:
   - Frontend: `npm run dev`
   - Functions (optional): use Firebase emulator `firebase emulators:start --only functions,firestore,auth`
4. Build & deploy:
   - `npm run build`
   - `firebase deploy --only hosting,firestore,functions`

Security notes:
- Replace any client-side role writes with secure callable functions in production.
- Store sensitive API keys (LLM providers) in Functions config: `firebase functions:config:set openai.key="..."`.
