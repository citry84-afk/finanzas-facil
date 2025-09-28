import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { user, loading, logout };
};

export const useUserData = (user: User | null) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const saveUserData = async (data: any) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        lastUpdated: new Date().toISOString(),
      });
      setUserData(data);
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
    setLoading(false);
  };

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setUserData(null);
    }
  }, [user]);

  return { userData, saveUserData, loadUserData, loading };
};
