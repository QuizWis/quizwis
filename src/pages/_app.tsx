import '../styles/globals.css';
import { Global, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import React from 'react';

import Page from '../components/Page';
import AuthProvider from '../features/auth/hooks/AuthContext';
import { PagePropsType } from '../types/PagePropsType';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps<PagePropsType>) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <Global
        styles={(theme) => ({
          body: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      />
      <NotificationsProvider>
        <Head>
          <title>{pageProps.title}</title>
        </Head>
        <AuthProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </AuthProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
