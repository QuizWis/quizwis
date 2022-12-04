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

const RegisterPage: WithGetAccessControl<NextPage> = () => {
  const { userData, logout, emailCreate } = useAuth();

  const PasswordValidation = (value: string) => {
    if (!value) {
      return 'パスワードは必須です。';
    // eslint-disable-next-line react/destructuring-assignment
    } if (value.length < 6) {
      return 'パスワードは6文字以上にしてください。';
    // eslint-disable-next-line react/destructuring-assignment
    } if (value.length > 128) {
      return 'パスワードは128文字以下にしてください。';
    } if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[!-~]{8,100}$/.test(value)) {
      return 'パスワードには英小文字と大文字、数字を含めてください。';
    }
    return null;
  };

  const form = useForm({
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : '正しいメールアドレスを入力してください。'),
      password: (value: string) => PasswordValidation(value),
      passwordCheck: (value, values) => (value === values.password ? null : 'パスワードが一致しません。'),
    },
  });

  const onLogin = async (values: { email: string; password: string }) => {
    try {
      await emailCreate(values.email, values.password);
    } catch (error: unknown) {
      // TODO: エラーの種類によってメッセージを変える
      showNotification({
        color: 'red',
        title: 'アカウント作成失敗',
        message: 'アカウントの作成に失敗しました。',
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
            新規登録
          </Title>
          <Group grow mb="md" mt="md">
            <GoogleButton>Google</GoogleButton>
            <TwitterButton>Twitter</TwitterButton>
          </Group>
          <Divider label="または" labelPosition="center" my="lg" />
          <form onSubmit={form.onSubmit(onLogin)}>
            <TextInput withAsterisk label="メールアドレス" {...form.getInputProps('email')} />
            <PasswordInput
              withAsterisk
              label="パスワード"
              {...form.getInputProps('password')}
              pt="xs"
            />
            <PasswordInput
              withAsterisk
              label="パスワード(確認)"
              {...form.getInputProps('passwordCheck')}
              pt="xs"
            />
            <Button type="submit" fullWidth mt="sm">
              登録
            </Button>
          </form>
          <Link href="/auth/login" passHref>
            <Text align="center" mt="md" size="sm">
              既にアカウントをお持ちの方は
              <Anchor<'a'>>こちら</Anchor>
            </Text>
          </Link>
        </Paper>
      )}
    </div>
  );
};

RegisterPage.getInitialProps = async () => ({ title: '新規登録 - QuizWis' });

RegisterPage.getAccessControl = () => null;

export default RegisterPage;
