import { SessionProvider } from "next-auth/react"

//Libs
import { ToastContainer } from "react-toastify";
import { ModalProvider } from 'styled-react-modal'

//Internal Components
import { Header } from '../components/header'

//Custom Styles
import { GlobalStyle } from "../styles/global";
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/DateRangePicker/styles/index.css';

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
