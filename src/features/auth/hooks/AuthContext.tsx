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
  createContext, useContext, useState, useEffect, ReactNode, useMemo,
} from 'react';

import auth from '../firebase';

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

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('unknown error');
    }
  };

  const twitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('unknown error');
    }
  };

  const emailLogin = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('unknown error');
    }
  };

  const emailCreate = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('unknown error');
    }
  };

  const passwordReset = async (email: string) => {
    const actionCodeSettings = {
      url: `http://localhost:3000/?email=${email}`,
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  };

  const logout = () => signOut(auth);

  useEffect(() => onAuthStateChanged(auth, (newUser) => {
    setUser(newUser);
    setLoading(false);
  }), []);

  const value = useMemo(() => ({
    user,
    googleLogin,
    twitterLogin,
    emailCreate,
    emailLogin,
    passwordReset,
    logout,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
