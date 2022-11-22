import {Head, Html, Main, NextScript} from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/Logo.svg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/Logo.svg" color="#1D2126" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:image" content="/Logo.svg" />
        <meta name="theme-color" content="#21252B" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
