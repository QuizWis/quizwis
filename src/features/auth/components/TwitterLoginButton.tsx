import { Button, ButtonProps } from '@mantine/core';
import { TwitterIcon } from '@mantine/ds';
import React from 'react';

import showErrorNotification from '../../../functions/showErrorNotification';
import { useAuth } from '../hooks/AuthContext';

/**
 * 押すとTwitterアカウントログイン処理が走るボタン。
 * @param props mantine標準のButtonPropsを継承。
*/
const TwitterLoginButton = (props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) => {
  const { twitterLogin } = useAuth();

  const handleClick = async () => {
    try {
      await twitterLogin();
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
      component="a"
      leftIcon={<TwitterIcon size={16} color="#00ACEE" />}
      variant="default"
      {...props}
      onClick={handleClick}
    />
  );
};

export default TwitterLoginButton;
