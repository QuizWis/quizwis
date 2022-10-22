import { Button, ButtonProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { useAuth } from '../features/auth/hooks/AuthContext';
import GoogleIcon from './GoogleIcon';

function GoogleButton(props: ButtonProps) {
  const { googleLogin } = useAuth();

  const handleClick = async () => {
    try {
      await googleLogin();
    } catch (error: unknown) {
      showNotification({
        color: 'red',
        title: 'ログイン失敗',
        message: 'ログインに失敗しました。',
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
}

export default GoogleButton;
