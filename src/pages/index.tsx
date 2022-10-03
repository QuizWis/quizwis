import { Button } from 'antd'
import type { NextPage } from 'next'
import { useAuth } from '../features/auth/hooks/AuthContext'

const Home: NextPage = () => {
  const { user, emailLogin, googleLogin, logout } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      {user &&
        <div>
          <p>{user.email}としてログインしています。</p>
          <button onClick={logout}>ログアウト</button>
        </div>
      }
      {!user &&
        <div>
          <Button onClick={googleLogin}>Googleでログイン</Button>
        </div>
      }
    </div>
  )
}

export default Home
