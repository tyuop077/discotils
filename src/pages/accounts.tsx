import {NextPage} from "next";
import {useEffect, useState} from "react";
import styles from "styles/Accounts.module.scss";
import AccountManager, {Account} from "../utils/accountManager";
import Loader from "../components/Loader/loader";

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
            {account.active ? `Active (verified ${timeFormatter.format((account.cachedOn - now) / 60 | 0, "minutes")})` : "Invalid token"}
          </div>
        )) : <Loader />}
      </div>
    </div>
  )
}

export default Accounts
