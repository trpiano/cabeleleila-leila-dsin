import { SessionProvider } from "next-auth/react"

import { GlobalStyle } from "../styles/global";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../components/header'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
          <GlobalStyle />

          <Header />
          <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
