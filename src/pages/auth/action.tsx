import {
  Button, Title, Text, Paper, PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import React from 'react';

import { useAuth } from '../../features/auth/hooks/AuthContext';
import { WithGetAccessControl } from '../../types';

const forgotPasswordPage: WithGetAccessControl<NextPage> = () => {
  const { passwordReset } = useAuth();
  const [mode, setMode] = React.useState<string>('');
  const [actionCode, setActionCode] = React.useState<string>('');

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const oobCode = queryParams.get('oobCode') || '';
    setMode(mode);
    setActionCode(oobCode);
  }, []);

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
      newPassword: (value: string) => PasswordValidation(value),
      newPasswordConfirm: (value, values) => (value === values.newPassword ? null : 'パスワードが一致しません。'),
    },
  });

  const onSubmitForm = async (values: { newPassword: string, newPasswordConfirm: unknown }) => {
    try {
      await passwordReset(actionCode, values.newPassword);
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
      <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: '480px' }}>
        <Title order={2} pt="sm">
          パスワード再設定
        </Title>
        <Text size="sm" mt="md" mb="md">
          再設定したいパスワードを入力してください。
        </Text>
        <form onSubmit={form.onSubmit(onSubmitForm)}>
          <PasswordInput
            withAsterisk
            label="新しいパスワード"
            {...form.getInputProps('newPassword')}
            pb="xs"
            mt="md"
          />
          <PasswordInput
            withAsterisk
            label="新しいパスワード（確認）"
            {...form.getInputProps('newPasswordConfirm')}
            pb="xs"
            mt="md"
          />
          <Button type="submit" fullWidth mt="sm">
            決定
          </Button>
        </form>
      </Paper>
    </div>
  );
};

forgotPasswordPage.getAccessControl = () => null;

forgotPasswordPage.getInitialProps = async () => ({ title: 'パスワードを忘れた - QuizWis' });

export default forgotPasswordPage;
