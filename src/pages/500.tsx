import type { NextPage } from "next"
import Head from "next/head"
import styles from "styles/ErrorHandler.module.scss"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Internal error - Discotils</title>
      </Head>
      <main>
        <div className={styles.error}>
          <h1>500</h1>
          <h2>Something went wrong</h2>
        </div>
      </main>
    </>
  )
}

export default Home
