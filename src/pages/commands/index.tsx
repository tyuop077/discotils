import {NextPage} from "next";
import Head from "next/head";
import styles from "styles/Commands.module.scss";
import AccountPicker from "components/AccountPicker/accountPicker";

const Commands: NextPage = () => {
  return (
    <>
      <Head>
        <title>Application Commands Editor - Discotils</title>
        <meta name="description" content="Discord slash commands, user and message context menus editor.
        Register and edit commands and interactions, add localization with Discotils application commands builder." />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.menu}>
            <div className={styles.account}>
              <AccountPicker />
            </div>
            <div className={styles.guildsPicker}>
              <h1>Application Commands Editor</h1>
              test
              test2
              test3
            </div>
          </div>
          <div className={styles.commandsPicker}>
            test
            test2
            test3
          </div>
        </div>
      </main>
    </>
  )
}

export default Commands
