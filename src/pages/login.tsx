import { Button, Form, Input, message } from 'antd'
import type { NextPage } from 'next'
import { useAuth } from '../features/auth/hooks/AuthContext'
import Link from 'next/link';

const LoginPage: NextPage = () => {
  const { user, googleLogin, logout, emailCreate, emailLogin } = useAuth();
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
      <h1>Login</h1>
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

export default LoginPage