import {NextPage} from "next";
import styles from "@styles/AccountsNew.module.scss";
import Head from "next/head";

const NewAccount: NextPage = () => {
  return (
    <main className={styles.container}>
      <Head>
        <title>Accounts - Discotils</title>
        <meta name="description" content="Discord Utilities" />
      </Head>
      <h3>New bot token</h3>
      <div className={styles.botInput}>
        <input
          type="password"
          placeholder="token"
        />
        <button>
          Add
        </button>
      </div>
      <div className={styles.divider}>
        <span>or</span>
      </div>
      <h3>Generate a bearer token</h3>
      <div className={styles.bearerInput}>
        <input
          type="text"
          placeholder="client id"
        />
        <input
          type="password"
          placeholder="client secret"
        />
        <button>
          Generate
        </button>
      </div>
    </main>
  )
}

export default NewAccount
