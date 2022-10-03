import type { NextPage } from "next"
import Head from "next/head"
import styles from "styles/ErrorHandler.module.scss"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found - Discotils</title>
      </Head>
      <main>
        <div className={styles.error}>
          <h1>404</h1>
          <h2>Oops… Nothing found :(</h2>
        </div>
      </main>
    </>
  )
}

export default Home
