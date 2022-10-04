import {NextPage} from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "styles/Commands.module.scss";
const AccountPicker = dynamic(() => import("components/AccountPicker/accountPicker"), {
  ssr: false,
  loading: () => <TextPlaceholder />
});
import TextPlaceholder from "../../components/TextPlaceholder/textPlaceholder";

const Commands: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Application Commands Editor - Discotils</title>
        <meta name="description" content="Discord slash commands, user and message context menus editor.
        Register and edit commands and interactions, add localization with Discotils application commands builder." />
      </Head>
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
  )
}

export default Commands
