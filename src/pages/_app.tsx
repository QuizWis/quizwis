import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from '../features/auth/hooks/AuthContext'
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
