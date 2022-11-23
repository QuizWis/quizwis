import {
  Button, TextInput, Title, Text, Paper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import auth from '../../features/auth/firebase';
import { WithGetAccessControl } from '../../types';

const ActionPage: WithGetAccessControl<React.FC> = () => {
  const [actionMode, setActionMode] = React.useState('');
  const [actionCode, setActionCode] = React.useState('');

  const router = useRouter();

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
      password: (value: string) => PasswordValidation(value),
      passwordCheck: (value, values) => (value === values.password ? null : 'パスワードが一致しません。'),
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const mode = queryParams.get('mode') || '';
    const oobCode = queryParams.get('oobCode') || '';
    setActionMode(mode);
    setActionCode(oobCode);
  }, []);

  const onResetPassword = async (values: { password: string }) => {
    if (actionMode !== 'resetPassword' || actionCode === '') {
      throw new Error('不正なURLです。');
    }
    verifyPasswordResetCode(auth, actionCode)
      .then(() => {
        confirmPasswordReset(auth, actionCode, values.password)
          .then(async () => {
            showNotification({
              color: 'green',
              title: 'パスワードリセット完了',
              message: 'パスワードは正常にリセットされました。',
            });
            router.push('/auth/login');
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
          });
      });
  };

  return (
    <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: '480px' }}>
      <>
        <Title order={2} pt="sm">
          パスワード再設定
        </Title>
        <Text size="sm" mt="md" mb="md">
          新しく設定したいパスワードを入力してください。
        </Text>
        <form onSubmit={form.onSubmit(onResetPassword)}>
          <TextInput
            withAsterisk
            label="新しいパスワード"
            {...form.getInputProps('password')}
            mb="xs"
          />
          <TextInput
            withAsterisk
            label="新しいパスワード(確認)"
            {...form.getInputProps('passwordCheck')}
            mb="sm"
          />
          <Button type="submit" fullWidth>
            パスワードを再設定する
          </Button>
        </form>
      </>
    </Paper>
  );
};

ActionPage.getAccessControl = () => null;

export default ActionPage;
