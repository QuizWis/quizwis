import { Button, Card, Col, Form, Input, message, Row, Typography } from 'antd'
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
      {user &&
        <div>
          <p>{user.email}としてログインしています。</p>
          <Button onClick={logout}>ログアウト</Button>
        </div>
      }
      {!user &&
        <Card style={{ maxWidth: "360px", margin: "auto" }}>
          <Typography.Title level={3}>ログイン</Typography.Title>
          <Form
            layout="vertical"
            form={form}
            onFinish={onLogin}
          >
            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder='メールアドレス'/>
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password placeholder='パスワード'/>
              <Link href='/register'>
                <a style={{ float: "right" }}>パスワードを忘れた</a>
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType='submit' style={{ width: "100%" }}>
                ログイン
              </Button>
              <Link href='/register'>
                <Typography.Text>または<a>新規登録</a></Typography.Text>
              </Link>
            </Form.Item>
          </Form>
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