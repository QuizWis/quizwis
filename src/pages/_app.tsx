import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from '../features/auth/hooks/AuthContext'
import Head from 'next/head';
import { PagePropsType } from '../types/PagePropsType';
import { MantineProvider } from '@mantine/core';
import Page from '../components/Page';

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
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <AuthProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </AuthProvider>
    </MantineProvider>
  )
}

export default MyApp
