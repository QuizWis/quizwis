import { Button, ButtonProps } from '@mantine/core';
import { TwitterIcon } from '@mantine/ds';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { useAuth } from '../features/auth/hooks/AuthContext';

/**
 * 押すとTwitterアカウントログイン処理が走るボタン。
 * @param props mantine標準のButtonPropsを継承。
*/
const TwitterButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) => {
  const { twitterLogin } = useAuth();

  const handleClick = async () => {
    try {
      await twitterLogin();
    } catch (error: unknown) {
      // TODO: ちゃんとエラー処理する
      showNotification({
        color: 'red',
        title: 'ログイン失敗',
        message: 'ログインに失敗しました。',
      });
    }
  };

  return (
    <Button
      component="a"
      leftIcon={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
      onClick={handleClick}
    />
  );
};

export default TwitterButton;
