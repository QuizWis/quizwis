import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from '../features/auth/hooks/AuthContext'
import 'antd/dist/antd.css';
import Head from 'next/head';
import { PagePropsType } from '../types/PagePropsType';
import Page from '../components/Page';

function MyApp({ Component, pageProps }: AppProps<PagePropsType>) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <AuthProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </AuthProvider>
    </>
  )
}

export default MyApp
