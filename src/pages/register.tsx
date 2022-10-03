import { Button, Form, Input, message, Typography } from 'antd'
import type { NextPage } from 'next'
import { useAuth } from '../features/auth/hooks/AuthContext'
import Link from 'next/link';
import { PagePropsType } from '../types/PagePropsType';

const LoginPage: NextPage<PagePropsType> = () => {
  const { user, logout, emailCreate } = useAuth();
  const [form] = Form.useForm();

  const onLogin = async(values: { email: string, password: string, passwordConfirm: string }) => {
    if (values.password == values.passwordConfirm) {
      try {
        await emailCreate(values.email, values.password);
      } catch (error: any) {
        message.error("アカウントの登録に失敗しました。");
      }
    } else {
      message.error('パスワードが一致しません。');
    }
  }

  return (
    <div>
      <Typography.Title>Register</Typography.Title>
      {user &&
        <div>
          <p>{user.email}としてログインしています。</p>
          <Button onClick={logout}>ログアウト</Button>
        </div>
      }
      {!user &&
        <div>
          <Form form={form} onFinish={onLogin}>
            <Form.Item name="email" label="メールアドレス" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="パスワード" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="passwordConfirm" label="パスワード（確認）" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType='submit'>
              新規登録
            </Button>
          </Form>
          <Link href='/login'>
            <a>ログインはこちら</a>
          </Link>
        </div>
      }
    </div>
  )
}

LoginPage.getInitialProps = async () => {
  return { title: "新規登録 - QuizWis" }
}

export default LoginPage