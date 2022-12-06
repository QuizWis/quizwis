import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';

import showErrorNotification from '../../../functions/showErrorNotification';
import { validationPassword, validationEmail } from '../functions/validation';
import { useAuth } from '../hooks/AuthContext';

/**
 * メールアドレスとパスワードでユーザー登録するためのフォーム
 */
const EmailRegisterForm = () => {
  const { emailCreate } = useAuth();

  const form = useForm({
    validate: {
      email: (value: string) => validationEmail(value),
      password: (value: string) => validationPassword(value),
      passwordConfirm: (value, values) => (value === values.password ? null : 'パスワードが一致しません。'),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await emailCreate(values.email, values.password);
      showNotification({
        color: 'green',
        title: '登録完了',
        message: '登録が完了しました。ログインしてください。',
      });
    } catch (error: unknown) {
      showErrorNotification({
        title: '登録失敗',
        error,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
        {...form.getInputProps('passwordConfirm')}
        pt="xs"
      />
      <Button type="submit" fullWidth mt="sm">
        登録
      </Button>
    </form>
  );
};

export default EmailRegisterForm;
