import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import React from 'react';

import showErrorNotification from '../../../functions/showErrorNotification';
import { validationEmail } from '../functions/validation';
import { useAuth } from '../hooks/AuthContext';

const SendPasswordResetEmailForm = () => {
  const { sendPasswordReset } = useAuth();

  const form = useForm({
    validate: {
      email: (value: string) => validationEmail(value),
    },
  });

  const handleSubmit = async (values: { email: string }) => {
    try {
      await sendPasswordReset(values.email);
      showNotification({
        color: 'green',
        title: '送信成功',
        message: 'パスワード再設定用のメールを送信しました。',
      });
      Router.push('/auth/login');
    } catch (error: unknown) {
      showErrorNotification({
        title: '送信失敗',
        error,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
  );
};

export default SendPasswordResetEmailForm;
