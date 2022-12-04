import {
  Button,
  TextInput,
  Title,
  Text,
  PasswordInput,
  Paper,
  Group,
  Divider,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import GoogleButton from '../../components/GoogleButton';
import TwitterButton from '../../components/TwitterButton';
import { useAuth } from '../../features/auth/hooks/AuthContext';
import { WithGetAccessControl } from '../../types';

const LoginPage: WithGetAccessControl<NextPage> = () => {
  const { userData, logout, emailLogin } = useAuth();

  const form = useForm({
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : '正しいメールアドレスを入力してください。'),
      password: (value: string) => (value ? null : 'パスワードは必須です。'),
    },
  });

  const onLogin = async (values: { email: string; password: string }) => {
    try {
      await emailLogin(values.email, values.password);
    } catch (error: unknown) {
      // TODO: エラーの種類によってメッセージを変える
      showNotification({
        color: 'red',
        title: 'ログイン失敗',
        message: 'ログインに失敗しました。',
      });
    }
  };

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
            ログイン
          </Title>
          <Group grow mb="md" mt="md">
            <GoogleButton>Google</GoogleButton>
            <TwitterButton>Twitter</TwitterButton>
          </Group>
          <Divider label="または" labelPosition="center" my="lg" />
          <form onSubmit={form.onSubmit(onLogin)}>
            <TextInput
              withAsterisk
              label="メールアドレス"
              {...form.getInputProps('email')}
              pb="xs"
            />
            <PasswordInput withAsterisk label="パスワード" {...form.getInputProps('password')} />
            <Link href="/auth/forgot_password">
              <Text align="right" size="xs">
                <Anchor<'a'>>パスワードを忘れた</Anchor>
              </Text>
            </Link>
            <Button type="submit" fullWidth mt="sm">
              ログイン
            </Button>
          </form>
          <Link href="/auth/register" passHref>
            <Text align="center" mt="md" size="sm">
              アカウントをお持ちでない方は
              <Anchor<'a'>>こちら</Anchor>
            </Text>
          </Link>
        </Paper>
      )}
    </div>
  );
};

LoginPage.getInitialProps = async () => ({ title: 'ログイン - QuizWis' });

LoginPage.getAccessControl = () => null;

export default LoginPage;
