import {
  TextInput, PasswordInput, Anchor, Button, Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import React from 'react';

import showErrorNotification from '../../../functions/showErrorNotification';
import { validationEmail } from '../functions/validation';
import { useAuth } from '../hooks/AuthContext';

/**
 * メールアドレスとパスワードでログインするためのフォーム
 */
const EmailLoginForm = () => {
  const { emailLogin } = useAuth();

  const form = useForm({
    validate: {
      email: (value: string) => validationEmail(value),
      password: (value: string) => (value ? null : 'パスワードは必須です。'),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await emailLogin(values.email, values.password);
      // TODO: マイページ的なのに飛ばす
    } catch (error: unknown) {
      showErrorNotification({
        title: 'ログイン失敗',
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
      />
      <PasswordInput withAsterisk label="パスワード" {...form.getInputProps('password')} />
      <Link href="/auth/forgot_password">
        <Text align="right" size="xs">
          <Anchor<'a'>>パスワードを忘れた</Anchor>
        </Text>
      </Link>
      <Button type="submit" fullWidth mt="sm">
        ログイン
      </Button>
    </form>
  );
};

export default EmailLoginForm;
