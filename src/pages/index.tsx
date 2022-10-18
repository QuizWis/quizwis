import type { NextPage } from 'next'
import { Text } from '@mantine/core';
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Link href="/auth/login" passHref>
      <Text variant="link" component="a" href="/auth/login">
        ログイン
      </Text>
    </Link>
  )
}

Home.getInitialProps = async () => {
  return { title: "QuizWis - 競技クイズコンテストサイト" };
}

export default Home;
