import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Header />
          <Component {...pageProps} />
          <Footer />
      </>
  )
}

export default MyApp
