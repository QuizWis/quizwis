import { Button, Form, Input, message, Typography } from 'antd'
import type { NextPage } from 'next'
import { useAuth } from '../features/auth/hooks/AuthContext'
import Link from 'next/link';
import { PagePropsType } from '../types/PagePropsType';

const LoginPage: NextPage<PagePropsType> = () => {
  const { user, googleLogin, logout, emailLogin } = useAuth();
  const [form] = Form.useForm();

  const onLogin = async(values: { email: string, password: string }) => {
    try {
      await emailLogin(values.email, values.password);
    } catch (error: any) {
      message.error("ログインに失敗しました。");
    }
  }

  return (
    <div>
      <Typography.Title>Login</Typography.Title>
      {user &&
        <div>
          <p>{user.email}としてログインしています。</p>
          <Button onClick={logout}>ログアウト</Button>
        </div>
      }
      {!user &&
        <div>
          <div>
            <Button onClick={googleLogin}>Googleでログイン</Button>
          </div>
          <Form form={form} onFinish={onLogin}>
            <Form.Item name="email" label="メールアドレス" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="パスワード" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType='submit'>
              ログイン
            </Button>
          </Form>
          <Link href='/register'>
            <a>新規登録はこちら</a>
          </Link>
        </div>
      }
    </div>
  )
}

LoginPage.getInitialProps = async () => {
  return { title: "ログイン - QuizWis" }
}

export default LoginPage