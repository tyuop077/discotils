import "@styles/globals.scss"
import type {NextPage} from "next"
import type {AppProps} from "next/app"
import type {ReactElement, ReactNode} from "react"
import Header from "@components/Header/header";
import Footer from "@components/Footer/footer";
import ErrorBoundary from "@components/ErrorBoundary/errorBoundary";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Header />
      <ErrorBoundary>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
      <Footer />
    </>
  )
}
