import {
  Button, Title, Text, Paper,
} from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';

import SendPasswordResetEmailForm from '../../features/auth/components/SendPasswordResetEmailForm';
import { useAuth } from '../../features/auth/hooks/AuthContext';
import { WithGetAccessControl } from '../../types';

const LoginPage: WithGetAccessControl<NextPage> = () => {
  const { userData, logout } = useAuth();

  return (
    <div>
      {userData && (
        <div>
          <p>
            {userData.email}
            としてログインしています。
          </p>
          <Button onClick={logout}>ログアウト</Button>
        </div>
      )}
      {!userData && (
        <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: '480px' }}>
          <Title order={2} pt="sm">
            パスワード再設定
          </Title>
          <Text size="sm" mt="md" mb="md">
            登録したメールアドレスを入力してください。
            <br />
            該当メールアドレスを持つアカウントが存在する場合は、パスワードリセット用のメールを送信します。
          </Text>
          <SendPasswordResetEmailForm />
        </Paper>
      )}
    </div>
  );
};

LoginPage.getInitialProps = async () => ({ title: 'パスワード再設定 - QuizWis' });

LoginPage.getAccessControl = () => null;

export default LoginPage;
