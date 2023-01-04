import type {NextPage} from "next"
import Head from "next/head"
import styles from "@styles/ErrorHandler.module.scss"

const NotFound: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Not Found - Discotils</title>
      </Head>
      <div className={styles.error}>
        <h1>404</h1>
        <h2>Oops… Nothing found :(</h2>
      </div>
    </main>
  )
}

export default NotFound
