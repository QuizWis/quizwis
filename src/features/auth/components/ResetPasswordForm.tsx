import { PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import Router from 'next/router';
import React from 'react';

import showErrorNotification from '../../../functions/showErrorNotification';
import { validationPassword } from '../functions/validation';
import { useAuth } from '../hooks/AuthContext';

type ResetPasswordFormProps = {
  actionCode: string,
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { actionCode } = props;
  const { passwordReset } = useAuth();

  const form = useForm({
    validate: {
      newPassword: (value: string) => validationPassword(value),
      newPasswordConfirm: (value, values) => (value === values.newPassword ? null : 'パスワードが一致しません。'),
    },
  });

  const onSubmitForm = async (values: { newPassword: string, newPasswordConfirm: unknown }) => {
    try {
      await passwordReset(actionCode, values.newPassword);
      showNotification({
        color: 'green',
        title: 'パスワード再設定成功',
        message: 'パスワードを再設定しました。',
      });
      Router.push('/auth/login');
    } catch (error: unknown) {
      showErrorNotification({
        title: 'パスワード再設定失敗',
        error,
      });
    }
  };

  return (
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
        再設定
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
