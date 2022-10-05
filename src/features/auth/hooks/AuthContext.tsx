import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from './../firebase'
import { 
  onAuthStateChanged,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signOut,
  User,
  signInWithPopup,
} from 'firebase/auth';

type authContextType = {
  user: User | null;
  emailLogin: (email: string, password: string) => Promise<any>;
  emailCreate: (email: string, password: string) => Promise<any>;
  googleLogin: () => Promise<any>;
  twitterLogin: () => Promise<any>;
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
    return signInWithPopup(auth, provider);
  }

  const twitterLogin = () => {
    const provider = new TwitterAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const emailLogin = async(email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  const emailCreate = async(email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
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
    twitterLogin,
    emailCreate,
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