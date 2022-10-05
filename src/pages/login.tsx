import { useForm } from "@mantine/form"
import type { NextPage } from 'next'
import { useAuth } from '../features/auth/hooks/AuthContext'
import Link from 'next/link';
import { PagePropsType } from '../types/PagePropsType';
import { Button, Card, TextInput, Title, Text, PasswordInput, Paper, Group, Divider, Anchor, Container } from '@mantine/core';
import GoogleButton from '../components/GoogleButton';
import TwitterButton from '../components/TwitterButton';
import { showNotification } from '@mantine/notifications';

const LoginPage: NextPage<PagePropsType> = () => {
  const { user, logout, emailLogin } = useAuth();

  const PasswordValidation = (value: string) => {
    if (!value) {
      return 'パスワードは必須です。';
    } else if(value.length < 6) {
      return 'パスワードは6文字以上にしてください。';
    } else if (value.length > 128) {
      return 'パスワードは128文字以下にしてください。';
    } else if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[!-~]{8,100}$/.test(value)) {
      return 'パスワードには英小文字と大文字、数字を含めてください。';
    } else {
      return null;
    }
  }

  const form = useForm({
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : '正しいメールアドレスを入力してください。'),
      password: (value: string) => PasswordValidation(value),
    }
  });

  const onLogin = async(values: { email: string, password: string }) => {
    try {
      await emailLogin(values.email, values.password);
    } catch (error: any) {
      showNotification({
        color: 'red',
        title: 'ログイン失敗',
        message: 'ログインに失敗しました。',
      });
    }
  }

  return (
    <div>
      {user &&
        <div>
          <p>{user.email}としてログインしています。</p>
          <Button onClick={logout}>ログアウト</Button>
        </div>
      }
      {!user &&
        <Paper radius="md" shadow="sm" p="lg" m="auto" withBorder style={{ maxWidth: "360px"}}>
          <Title order={2} pt="sm">
            ログイン
          </Title>
          <Group grow mb="md" mt="md">
            <GoogleButton>Google</GoogleButton>
            <TwitterButton>Twitter</TwitterButton>
          </Group>
          <Divider label="または" labelPosition="center" my="lg" />
          <form onSubmit={form.onSubmit(onLogin)}>
            <TextInput
              withAsterisk
              label="メールアドレス"
              {...form.getInputProps('email')}
              pb="xs"
            />
            <PasswordInput
              withAsterisk
              label="パスワード"
              {...form.getInputProps('password')}
            />
            <Link href='/register'>
              <Text align="right" size="xs">
                <Anchor<'a'>>
                  パスワードを忘れた
                </Anchor>
              </Text>
            </Link>
            <Button type='submit' fullWidth mt="sm">
              ログイン
            </Button>
          </form>
          <Link href='/register' passHref>
            <Text align="center" mt="md" size="sm">
              アカウントをお持ちでない方は
              <Anchor<'a'>>
                こちら
              </Anchor>
            </Text>
          </Link>
        </Paper>
      }
    </div>
  )
}

LoginPage.getInitialProps = async () => {
  return { title: "ログイン - QuizWis" }
}

export default LoginPage