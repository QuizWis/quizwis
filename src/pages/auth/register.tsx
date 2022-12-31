import {
  Button,
  Title,
  Text,
  Paper,
  Group,
  Divider,
  Anchor,
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import EmailRegisterForm from '../../features/auth/components/EmailRegisterForm';
import GoogleLoginButton from '../../features/auth/components/GoogleLoginButton';
import TwitterLoginButton from '../../features/auth/components/TwitterLoginButton';
import { useAuth } from '../../features/auth/hooks/AuthContext';
import { WithGetAccessControl } from '../../types';

/**
 * 新規登録ページ
 */
const RegisterPage: WithGetAccessControl<NextPage> = () => {
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
            新規登録
          </Title>
          <Group grow mb="md" mt="md">
            <GoogleLoginButton>Google</GoogleLoginButton>
            <TwitterLoginButton>Twitter</TwitterLoginButton>
          </Group>
          <Divider label="または" labelPosition="center" my="lg" />
          <EmailRegisterForm />
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

// TODO: ログインしている場合は、ユーザーページにリダイレクトする
RegisterPage.getAccessControl = () => null;

export default RegisterPage;
