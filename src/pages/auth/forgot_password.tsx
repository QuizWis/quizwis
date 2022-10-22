import {
  Button, TextInput, Title, Text, Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import { useAuth } from '../../features/auth/hooks/AuthContext';

function LoginPage() {
  const { user, logout, passwordReset } = useAuth();

  const form = useForm({
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : '正しいメールアドレスを入力してください。'),
    },
  });

  const onLogin = async (values: { email: string }) => {
    try {
      await passwordReset(values.email);
    } catch (error: unknown) {
      // TODO: エラーの種類によってメッセージを変える
      showNotification({
        color: 'red',
        title: '送信失敗',
        message: 'パスワードリセット用メールの送信に失敗しました。',
      });
    }
  };

  return (
    <div>
      {user && (
        <div>
          <p>
            {user.email}
            としてログインしています。
          </p>
          <Button onClick={logout}>ログアウト</Button>
        </div>
      )}
      {!user && (
        <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: '360px' }}>
          <Title order={2} pt="sm">
            パスワードを忘れた
          </Title>
          <Text size="xs" mt="md" mb="md">
            登録したメールアドレスを入力してください。
            <br />
            該当メールアドレスを持つアカウントが存在する場合は、パスワードリセット用のメールを送信します。
          </Text>
          <form onSubmit={form.onSubmit(onLogin)}>
            <TextInput
              withAsterisk
              label="メールアドレス"
              {...form.getInputProps('email')}
              pb="xs"
              mt="md"
            />
            <Button type="submit" fullWidth mt="sm">
              メール送信
            </Button>
          </form>
        </Paper>
      )}
    </div>
  );
}

LoginPage.getInitialProps = async () => ({ title: 'パスワードを忘れた - QuizWis' });

export default LoginPage;
