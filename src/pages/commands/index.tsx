import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/Commands.module.scss";
import Link from "next/link";
import AccountList from "@components/AccountList/accountList";

const Commands: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Application Commands Editor - Discotils</title>
        <meta name="description" content="Discord slash commands, user and message context menus editor.
        Register and edit commands and interactions, add localization with Discotils application commands builder." />
      </Head>
      <div className={styles.container}>
        <h1>Application Commands Editor</h1>
        <h3>Select an account or <Link href="/accounts">add</Link> one</h3>
        <AccountList />
      </div>
    </main>
  )
}

export default Commands
