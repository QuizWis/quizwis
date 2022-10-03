import { Typography } from 'antd'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/login">
        <a>ログイン</a>
      </Link>
    </div>
  )
}

Home.getInitialProps = async () => {
  return { title: "QuizWis - 競技クイズコンテストサイト" }
}

export default Home;
