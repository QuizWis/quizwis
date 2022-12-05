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

import EmailLoginForm from '../../features/auth/components/EmailLoginForm';
import GoogleLoginButton from '../../features/auth/components/GoogleLoginButton';
import TwitterLoginButton from '../../features/auth/components/TwitterLoginButton';
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
            ログイン
          </Title>
          <Group grow mb="md" mt="md">
            <GoogleLoginButton>Google</GoogleLoginButton>
            <TwitterLoginButton>Twitter</TwitterLoginButton>
          </Group>
          <Divider label="または" labelPosition="center" my="lg" />
          <EmailLoginForm />
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

// TODO: ログインしている場合は、ユーザーページにリダイレクトする
LoginPage.getAccessControl = () => null;

export default LoginPage;
