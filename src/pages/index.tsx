import { Text } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { WithGetAccessControl } from '../types';

/**
 * メインページ
 */
const Home: WithGetAccessControl<NextPage> = () => (
  <Link href="/auth/login" passHref>
    <Text variant="link" component="a" href="/auth/login">
      ログイン
    </Text>
  </Link>
);

Home.getInitialProps = async () => ({ title: 'QuizWis - 競技クイズコンテストサイト' });

Home.getAccessControl = () => null;

export default Home;
