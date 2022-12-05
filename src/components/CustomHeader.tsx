import {
  Header, Button, Group, Title,
} from '@mantine/core';
import Link from 'next/link';
import React from 'react';

/**
 * 独自定義のヘッダー。
 * 現状全ページに標準で表示される。
 */
const CustomHeader = () => (
  <Header
    height="60px"
    px="md"
    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <Link href="/" passHref>
      <Title order={3}>QuizWis</Title>
    </Link>
    <Group>
      <Button variant="outline" color="blue" component="a" href="/auth/login">
        ログイン
      </Button>
      <Button variant="filled" color="blue" component="a" href="/auth/register">
        新規登録
      </Button>
    </Group>
  </Header>
);

export default CustomHeader;
