import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCN_29bjsvBkPJmXy8Y5lGc16MK9cd6-SE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "finanzas-facil-fe8eb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "finanzas-facil-fe8eb",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "finanzas-facil-fe8eb.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "840948445547",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:840948445547:web:4aada8452bd06509479c2e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QT23TVY0GJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
