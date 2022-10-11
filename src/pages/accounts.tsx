import {NextPage} from "next";
import styles from "@styles/Accounts.module.scss";
import Head from "next/head";
import AccountList from "@components/AccountList/accountList";

const Accounts: NextPage = () => {
  return (
    <main className={styles.container}>
      <Head>
        <title>Accounts - Discotils</title>
        <meta name="description" content="Discord Utilities" />
      </Head>
      <h1>Accounts</h1>
      <AccountList extended />
    </main>
  )
}

export default Accounts
