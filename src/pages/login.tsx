import { useForm } from "@mantine/form"
import type { NextPage } from 'next'
import { useAuth } from '../features/auth/hooks/AuthContext'
import Link from 'next/link';
import { PagePropsType } from '../types/PagePropsType';
import { Button, Card, TextInput, Title, Text, PasswordInput } from '@mantine/core';

const LoginPage: NextPage<PagePropsType> = () => {
  const { user, googleLogin, logout, emailLogin } = useAuth();

  const PasswordValidation = (value: string) => {
    if(value.length < 6) {
      return 'パスワードは6文字以上にしてください。';
    } else if (value.length > 128) {
      return 'パスワードは128文字以下にしてください。';
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0x20-0x7e]$/.test(value)) {
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
      console.error("ログインに失敗しました。");
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
        <Card shadow="sm" p="lg" radius="md" m="auto" withBorder style={{ maxWidth: "360px"}}>
          <Title order={2} pb="sm">
            ログイン
          </Title>
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
              <Text size="xs" variant="link" component="a" pb="xs">
                パスワードを忘れた
              </Text>
            </Link>
            <Button type='submit' fullWidth>
              ログイン
            </Button>
            <Link href='/register'>
              <Text>または<Text variant="link" component="a">新規登録</Text></Text>
            </Link>
          </form>
          <div>
            <Button onClick={googleLogin}>Googleでログイン</Button>
          </div>
        </Card>
      }
    </div>
  )
}

LoginPage.getInitialProps = async () => {
  return { title: "ログイン - QuizWis" }
}

export default LoginPage