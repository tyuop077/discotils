import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Discotils</title>
        <meta name="description" content="Discord Utilities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Discotils
        </h1>
      </main>
    </>
  )
}

export default Home
