import type { NextPage } from "next"
import Head from "next/head"
import styles from "styles/NotFound.module.scss"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found - Discotils</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.notFound}>
          <h1>404</h1>
          <h2>Oops… Nothing found :(</h2>
        </div>
      </main>
    </>
  )
}

export default Home
