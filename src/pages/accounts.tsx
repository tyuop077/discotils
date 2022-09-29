import {NextPage} from "next";
import {useEffect, useState} from "react";
import styles from "styles/Accounts.module.scss";
import AccountManager, {Account} from "utils/accountManager";
import Loader from "components/Loader/loader";
import Close from "assets/Close.svg";

const tokenRegex = /^(Bot\s)?(?<token>[\w-]{24}\.[\w-]{6}\.[\w-]{27})/i;
const timeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const Accounts: NextPage = () => {
  const [accounts, setAccounts] = useState<Record<string, Account>>();
  const now = Date.now() / 1000 | 0;
  useEffect(() => {
    AccountManager.checkAll().then(() => setAccounts(AccountManager.accounts));
  }, [])
  useEffect(() => {
    const listener = (e: any) => {
      const text = e.clipboardData.getData("text");
      const match = tokenRegex.exec(text);
      if (match) {
        const token = match.groups?.token;
        if (!token) return;
        AccountManager.add(token).then(() => setAccounts(AccountManager.accounts));
      }
      alert(e.clipboardData?.getData("text"));
    };
    addEventListener("paste", listener);
    return () => removeEventListener("paste", listener);
  })
  const list = accounts ? Object.entries(accounts) : undefined;
  let spent;
  return (
    <div className={styles.container}>
      <h1>Accounts</h1>
      <h3>Paste a new or existing bot token</h3>
      <h5>or type it there:</h5>
      <input
        type="password"
        placeholder="token" />
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
            <button
              onClick={() => {
                AccountManager.remove(id);
                setAccounts(AccountManager.accounts);
              }}
            ><Close /></button>
            <b>{account.username}</b><span>#{account.discriminator}</span>
            {account.active ?
              <p>{`Active (validated ${
                (spent = account.cachedOn - now) < -10 ?
                  timeFormatter.format(spent / 60 | 0, "minutes") : "just now"
              })`}</p>
              : <p className="error">Invalid token</p>}
          </div>
        )) : <Loader />}
      </div>
    </div>
  )
}

export default Accounts
