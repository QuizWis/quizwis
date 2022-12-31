import {
  Title, Text, Paper,
} from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';

import SendPasswordResetEmailForm from '../../features/auth/components/SendPasswordResetEmailForm';
import { WithGetAccessControl } from '../../types';

/**
 * パスワード再設定メール送信用のページ
 */
const ForgotPasswordPage: WithGetAccessControl<NextPage> = () => (
  <div>
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
  </div>
);

ForgotPasswordPage.getInitialProps = async () => ({ title: 'パスワード再設定 - QuizWis' });

ForgotPasswordPage.getAccessControl = () => null;

export default ForgotPasswordPage;
