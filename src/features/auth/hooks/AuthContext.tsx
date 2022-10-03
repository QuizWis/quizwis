import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from './../firebase'
import { onAuthStateChanged, signInWithRedirect, signInWithEmailAndPassword, getRedirectResult, GoogleAuthProvider, signOut, User } from 'firebase/auth';

type authContextType = {
  user: User | null;
  emailLogin: (email: string, password: string) => Promise<any>;
  googleLogin: () => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<authContextType>({} as authContextType);

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    return signInWithRedirect(auth, provider);
  }

  const emailLogin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect (() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    })
  }, [])

  const value = {
    user,
    googleLogin,
    emailLogin,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;