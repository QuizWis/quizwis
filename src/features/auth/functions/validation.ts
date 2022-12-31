/**
 * mantine uiのフォームに設定する用のパスワードのバリデーション
 * 8文字以上128文字以下かつ大文字、小文字、数字を全て含む
 * @returns エラーメッセージ(正常なら`null`)
 */
export const validationPassword = (value: string) => {
  if (!value) {
    return 'パスワードは必須です。';
  // eslint-disable-next-line react/destructuring-assignment
  } if (value.length < 8) {
    return 'パスワードは8文字以上にしてください。';
  // eslint-disable-next-line react/destructuring-assignment
  } if (value.length > 128) {
    return 'パスワードは128文字以下にしてください。';
  } if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[!-~]{8,128}$/.test(value)) {
    return 'パスワードには英小文字と大文字、数字を含めてください。';
  }
  return null;
};

/**
 * mantine uiのフォームに設定する用のメールアドレスのバリデーション
 * @returns エラーメッセージ(正常なら`null`)
 */
export const validationEmail = (value: string) => {
  if (!value) {
    return 'メールアドレスは必須です。';
  } if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
    return 'メールアドレスの形式が正しくありません。';
  }
  return null;
};
