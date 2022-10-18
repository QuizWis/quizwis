import { Header, Container, Button, Group, Title } from '@mantine/core';
import Link from 'next/link';

const CustomHeader = () => {
  return (
    <Header height="60px" px="md" style={{ display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
      <Link href="/" passHref>
        <Title order={3}>QuizWis</Title>
      </Link>
      <Group>
        <Link href="/auth/login" passHref>
          <Button variant='outline'>ログイン</Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button>新規登録</Button>
        </Link>
      </Group>
    </Header>
  )
}

export default CustomHeader