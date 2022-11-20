import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signOut,
  User,
  signInWithPopup,
  sendPasswordResetEmail,
  UserCredential,
} from 'firebase/auth';
import React, {
  createContext, useContext, useState, useEffect, ReactNode,
} from 'react';

import { auth } from '../firebase';

type AuthContextType = {
  user: User | null;
  emailLogin: (email: string, password: string) => Promise<UserCredential>;
  emailCreate: (email: string, password: string) => Promise<UserCredential>;
  passwordReset: (email: string) => Promise<void>;
  googleLogin: () => Promise<UserCredential>;
  twitterLogin: () => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const twitterLogin = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const emailLogin = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const emailCreate = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const passwordReset = async (email: string) => {
    sendPasswordResetEmail(auth, email);
  };

  const logout = () => signOut(auth);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
  }), []);

  const value = {
    user,
    googleLogin,
    twitterLogin,
    emailCreate,
    emailLogin,
    passwordReset,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
