import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from '../features/auth/hooks/AuthContext'
import Head from 'next/head';
import { PagePropsType } from '../types/PagePropsType';
import { MantineProvider } from '@mantine/core';
import Page from '../components/Page';
import { NotificationsProvider } from '@mantine/notifications';

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
  )
}

export default MyApp
