import {
  Title, Text, Paper,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm';
import { WithGetAccessControl } from '../../types';

/**
 * パスワード再設定のためのページ
 */
const forgotPasswordPage: WithGetAccessControl<NextPage> = () => {
  const [mode, setMode] = React.useState<string>('');
  const [actionCode, setActionCode] = React.useState<string>('');

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode') || '';
    const paramMode = queryParams.get('mode') || '';
    setMode(paramMode);
    setActionCode(oobCode);
    if (paramMode !== 'resetPassword') {
      showNotification({
        color: 'red',
        title: 'エラー',
        message: '不正なリンクです。',
      });
      Router.push('/auth/login');
    }
  }, []);

  return (
    <div>
      {mode === 'resetPassword' && (
        <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: '480px' }}>
          <Title order={2} pt="sm">
            パスワード再設定
          </Title>
          <Text size="sm" mt="md" mb="md">
            再設定したいパスワードを入力してください。
          </Text>
          <ResetPasswordForm actionCode={actionCode} />
        </Paper>
      )}
    </div>
  );
};

forgotPasswordPage.getAccessControl = () => null;

forgotPasswordPage.getInitialProps = async () => ({ title: 'パスワード再設定 - QuizWis' });

export default forgotPasswordPage;
