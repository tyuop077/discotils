import {NextPage} from "next";
import styles from "@styles/AccountsNew.module.scss";
import Head from "next/head";
import AccountList from "@components/AccountList/accountList";
import {useState} from "react";
import {useRouter} from "next/router";

const NewAccount: NextPage = () => {
  const [isListOpen, setListOpen] = useState(false);
  const router = useRouter();
  const id = router.query.id;
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
          onFocus={() => setListOpen(true)}
          onBlur={() => setListOpen(false)}
          value={id ?? undefined}
        />
        {isListOpen ? (
          <div className={styles.list}>
            <AccountList to="/accounts/new?id={}" />
          </div>
        ) : null}
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
