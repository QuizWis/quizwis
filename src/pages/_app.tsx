import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { Global, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import React from 'react';

import Page from '../components/Page';
import AuthProvider from '../features/auth/hooks/AuthContext';
import apolloClient from '../lib/apollo';
import { PagePropsType } from '../types/PagePropsType';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps<PagePropsType>) {
  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
}

export default MyApp;
