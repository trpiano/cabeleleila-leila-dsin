import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import { ModalProvider } from 'styled-react-modal'

import { Header } from '../components/header'

import { GlobalStyle } from "../styles/global";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <ModalProvider>
          <GlobalStyle />
          <ToastContainer />

          <Header />
          <Component {...pageProps} />
        </ModalProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
