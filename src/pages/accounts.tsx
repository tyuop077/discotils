import {NextPage} from "next";
import {useEffect, useState} from "react";
import styles from "styles/Accounts.module.scss";
import AccountManager, {Account} from "../utils/accountManager";
import Loader from "../components/Loader/loader";

const Accounts: NextPage = () => {
  const [accounts, setAccounts] = useState<Record<string, Account>>();
  useEffect(() => {
    setAccounts(AccountManager.accounts);
  }, [])
  useEffect(() => {
    const listener = (e: any) => { // TODO: replace with ClipboardEvent
      alert(e.clipboardData?.getData("text"));
    };
    addEventListener("paste", listener);
    return () => removeEventListener("paste", listener);
  })
  const list = accounts ? Object.entries(accounts) : undefined;
  return (
    <div className={styles.container}>
      <input
        type="password"
        placeholder="Paste new or existing bot token here" />
      <div className={styles.accounts}>
        {list ? list.map(([id, account]) => (
          <div className={styles.account} key={id}>
            <img
              src={
                account.avatar ?
                  "https://cdn.discordapp.com/avatars/" +
                  `${encodeURIComponent(id)}/${encodeURIComponent(account.avatar)}.webp?size=128` :
                  `https://cdn.discordapp.com/embed/avatars/${parseInt(account.discriminator) % 5}.png`
              }
              alt={account.username}
            />
            <span>{account.username}#{account.discriminator}</span>
          </div>
        )) : <Loader />}
      </div>
    </div>
  )
}

export default Accounts
