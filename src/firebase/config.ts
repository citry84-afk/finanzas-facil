// Firebase Configuration for FinanzasFácil
// TODO: Replace with your actual Firebase credentials after creating the project
// Get these from Firebase Console > Project Settings > General > Your apps > Web app

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDEMO_KEY_REPLACE_ME",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "finanzasfacil.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "finanzasfacil",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "finanzasfacil.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXX"
};

// Firebase App Name
export const FIREBASE_APP_NAME = "FinanzasFacil";

// Firebase Collections
export const COLLECTIONS = {
  USERS: 'users',
  CALCULATIONS: 'calculations',
  TRACKED_EXPENSES: 'trackedExpenses',
  SETTINGS: 'settings'
};

// User document structure
export interface UserProfile {
  name: string;
  email: string;
  createdAt: Date;
  isPremium: boolean;
  subscriptionEnd: Date | null;
}

export interface Calculation {
  type: 'irpf' | 'cuota' | 'gastos';
  inputs: Record<string, any>;
  results: Record<string, any>;
  date: Date;
}

export interface TrackedExpense {
  category: string;
  amount: number;
  date: Date;
  deductible: boolean;
  description: string;
}

export interface UserSettings {
  notifications: boolean;
  theme: 'light' | 'dark';
  language: 'es';
}

