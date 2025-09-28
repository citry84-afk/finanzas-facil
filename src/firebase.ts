import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCN_29bjsvBkPJmXy8Y5lGc16MK9cd6-SE",
  authDomain: "finanzas-facil-fe8eb.firebaseapp.com",
  projectId: "finanzas-facil-fe8eb",
  storageBucket: "finanzas-facil-fe8eb.firebasestorage.app",
  messagingSenderId: "840948445547",
  appId: "1:840948445547:web:4aada8452bd06509479c2e",
  measurementId: "G-QT23TVY0GJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
