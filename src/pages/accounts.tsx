import {NextPage} from "next";
import styles from "@styles/Accounts.module.scss";
import Head from "next/head";
import AccountList from "@components/AccountList/accountList";
import Plus from "@assets/Plus.svg";
import Refresh from "@assets/Refresh.svg";
import Link from "next/link";

const Accounts: NextPage = () => {
  return (
    <main className={styles.container}>
      <Head>
        <title>Accounts - Discotils</title>
        <meta name="description" content="Discord Utilities" />
      </Head>
      <h1>Accounts</h1>
      <div className={styles.buttons}>
        <button className={styles.button}>
          <Refresh />
          Refresh
        </button>
        <Link href="/accounts/new">
          <button className={styles.button}>
            <Plus />
            Add
          </button>
        </Link>
      </div>
      <AccountList extended />
    </main>
  )
}

export default Accounts
