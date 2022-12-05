import { Button, ButtonProps } from '@mantine/core';
import React from 'react';

import showErrorNotification from '../../../functions/showErrorNotification';
import { useAuth } from '../hooks/AuthContext';
import GoogleIcon from './GoogleIcon';

/**
 * 押すとGoogleアカウントログイン処理が走るボタン。
 * @param props mantine標準のButtonPropsを継承。
*/
const GoogleLoginButton = (props: ButtonProps) => {
  const { googleLogin } = useAuth();

  const handleClick = async () => {
    try {
      await googleLogin();
      // TODO: マイページ的なものに飛ばす
    } catch (error: unknown) {
      showErrorNotification({
        title: 'ログイン失敗',
        error,
      });
    }
  };

  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      onClick={handleClick}
      {...props}
    />
  );
};

export default GoogleLoginButton;
