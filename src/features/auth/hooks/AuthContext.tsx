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

import {
  useCreateUserMutation, useGetUserLazyQuery,
} from '../../../graphql/generated/type';
import auth from '../firebase';

type AuthContextType = {
  userData: AuthContextUserType | null;
  emailLogin: (email: string, password: string) => Promise<UserCredential>;
  emailCreate: (email: string, password: string) => Promise<UserCredential>;
  passwordReset: (email: string) => Promise<void>;
  googleLogin: () => Promise<UserCredential>;
  twitterLogin: () => Promise<UserCredential>;
  logout: () => Promise<void>;
};

type AuthContextUserType = {
  __typename?: 'User';
  id: string;
  name: string;
  email: string;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AuthContextUserType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadLoginUser, { called, loading, data }] = useGetUserLazyQuery();
  const [createUser] = useCreateUserMutation();

  const reloadUserData = async (newUser: User | null = user) => {
    if (newUser) {
      const queryResult = await loadLoginUser({ variables: { databaseId: newUser.uid } });
      setUserData(queryResult.data?.user || null);
    } else {
      setUserData(null);
    }
  };

  /**
   * データベースに現在ログイン中のユーザーを問い合わせ、なければ作成する
   * @param checkUser 現在ログイン中のユーザー
   */
  const checkDatabase = async (checkUser: User) => {
    const res = await loadLoginUser({ variables: { databaseId: checkUser.uid } });
    if (!res.data?.user) {
      if (!checkUser.displayName) { throw new Error('メールアドレスが取得できませんでした。'); }
      await createUser({
        variables:
          {
            databaseId: checkUser.uid,
            email: checkUser.email || '',
            name: checkUser.displayName.split('@')[0],
          },
      });
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const ret = await signInWithPopup(auth, provider);
      await checkDatabase(ret.user);
      return ret;
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
      const ret = await signInWithPopup(auth, provider);
      await checkDatabase(ret.user);
      return ret;
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
      const ret = await createUserWithEmailAndPassword(auth, email, password);
      await checkDatabase(ret.user);
      return ret;
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
    reloadUserData(newUser);
    setAuthLoading(false);
  }), []);

  const value = useMemo(() => ({
    userData,
    googleLogin,
    twitterLogin,
    emailCreate,
    emailLogin,
    passwordReset,
    logout,
  }), [user, userData]);

  return (
    <AuthContext.Provider value={value}>
      {(authLoading || loading) ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
