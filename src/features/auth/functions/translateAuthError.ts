const translateAuthError = (errorMessage: string) => {
  const errorCode = errorMessage.match(/\((.*)\)/)?.[1];
  if (errorCode === 'auth/popup-closed-by-user') {
    return 'ログインをキャンセルしました。';
  } if (errorCode === 'auth/popup-blocked') {
    return 'ポップアップがブロックされました。';
  } if (errorCode === 'auth/cancelled-popup-request') {
    return '同時に開けるログイン用のポップアップは1つまでです。';
  } if (errorCode === 'auth/user-disabled'
  || errorCode === 'auth/user-not-found') {
    return 'ユーザーが見つかりません。';
  } if (errorCode === 'auth/wrong-password') {
    return 'パスワードが間違っています。';
  } if (errorCode === 'auth/invalid-email') {
    return 'メールアドレスの形式が不正です。';
  } if (errorCode === 'auth/account-exists-with-different-credential'
  || errorCode === 'auth/email-already-in-use') {
    return '既に登録済みのメールアドレスです。';
  } if (errorCode === 'auth/weak-password') {
    return 'パスワードが弱すぎます。';
  } if (errorCode === 'auth/expired-action-code'
  || errorCode === 'auth/invalid-action-code') {
    return 'リンクが無効です。';
  }
  return '不明なエラーが発生しました。';
};

export default translateAuthError;
