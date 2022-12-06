/**
 * 認証の諸々を管理するコンテキスト
 * プロジェクト全体がfirebase authと密結合にならないように、firebase authの型を隠蔽する
 */

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
  verifyPasswordResetCode,
  confirmPasswordReset,
} from 'firebase/auth';
import React, {
  createContext, useContext, useState, useEffect, ReactNode, useMemo,
} from 'react';

import {
  useCreateUserMutation, useGetUserLazyQuery,
} from '../../../graphql/generated/type';
import auth from '../firebase';
import translateAuthError from '../functions/translateAuthError';

type AuthContextType = {
  userData: AuthContextUserType | null;
  emailLogin: (email: string, password: string) => Promise<void>;
  emailCreate: (email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  passwordReset: (actionCode: string, newPassword: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  twitterLogin: () => Promise<void>;
  logout: () => Promise<void>;
};

/**
 * データベースから取得しておいておくユーザー情報
 * ここを肥大化させるよりはここのidを使って各コンポーネントでAPIを叩く用途
 */
type AuthContextUserType = {
  __typename?: 'User';
  id: string;
  name: string;
  email: string;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * 認証関連の関数を使うためのReact Hooks
 */
export const useAuth = () => useContext(AuthContext);

/**
 * 囲むとuseAuth()で認証関連の諸々が使えるようになる
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  /** 現在のユーザーの情報 */
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
   * @param checkUser firebase側のユーザー情報
   */
  const checkDatabase = async (checkUser: User) => {
    const res = await loadLoginUser({ variables: { databaseId: checkUser.uid } });
    if (!res.data?.user) {
      if (!checkUser.displayName && !checkUser.email) { throw new Error('メールアドレスが取得できませんでした。'); }
      await createUser({
        variables:
          {
            databaseId: checkUser.uid,
            email: checkUser.email || '',
            name: checkUser.displayName?.split('@')[0] || checkUser.email?.split('@')[0] || '',
          },
      });
    }
  };

  /**
   * ポップアップによるGoogleログイン
   * @error ユーザーに表示する形になっているエラーメッセージ
   */
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      await checkDatabase(res.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(translateAuthError(error.message));
      }
      throw new Error('不明なエラーです。');
    }
  };

  /**
   * ポップアップによるTwitterログイン
   * @error ユーザーに表示する形になっているエラーメッセージ
   */
  const twitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      await checkDatabase(res.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(translateAuthError(error.message));
      }
      throw new Error('不明なエラーです。');
    }
  };

  /**
   * メールアドレスとパスワードによるログイン
   * @error ユーザーに表示する形になっているエラーメッセージ
   */
  const emailLogin = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await checkDatabase(res.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(translateAuthError(error.message));
      }
      throw new Error('不明なエラーです。');
    }
  };

  /**
   * メールアドレスとパスワードによる新規登録
   * @error ユーザーに表示する形になっているエラーメッセージ
   */
  const emailCreate = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await checkDatabase(res.user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('不明なエラーです。');
    }
  };

  /**
   * パスワードリセット用のメールを送信
   * @error ユーザーに表示する形になっているエラーメッセージ
   */
  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(translateAuthError(error.message));
      }
      throw new Error('不明なエラーです。');
    }
  };

  /**
   * パスワードの再設定
   * @param actionCode firebaseで生成されたパスワード再設定用のコード
   * @param newPassword 新しいパスワード
   * @error ユーザーに表示する形になっているエラーメッセージ
   */
  const passwordReset = async (actionCode: string, newPassword: string) => {
    try {
      await verifyPasswordResetCode(auth, actionCode);
      await confirmPasswordReset(auth, actionCode, newPassword);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(translateAuthError(error.message));
      }
      throw new Error('不明なエラーです。');
    }
  };

  /**
   * ログアウト
   */
  const logout = async () => {
    await signOut(auth);
  };

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
    sendPasswordReset,
    passwordReset,
    logout,
  }), [user]);

  // ログイン状態が変わるまでローディングを表示
  // TODO: ローディング画面をちゃんと作る
  return (
    <AuthContext.Provider value={value}>
      {(authLoading || loading) ? <p>loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
