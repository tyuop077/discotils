import {NextPage} from "next";
import {useEffect, useState} from "react";
import styles from "styles/Accounts.module.scss";
import AccountManager, {Account} from "utils/accountManager";
import Loader from "components/Loader/loader";
import Close from "assets/Close.svg";

const tokenRegex = /^(Bot\s)?(?<token>[\w-]{24}\.[\w-]{6}\.[\w-]{27})/i;
const timeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const toastLabels: Record<string, string> = {
  validating: "Validating...",
  failed: "Failed verifying accounts",
  failedPartially: "Failed verifying some accounts",
  invalidToken: "Pasted token is invalid"
}

const Accounts: NextPage = () => {
  const [accounts, setAccounts] = useState<Record<string, Account>>();
  const [status, setStatus] = useState<string | null>(null);
  const now = Date.now() / 1000 | 0;
  useEffect(() => {
    setAccounts(AccountManager.accounts);
    setStatus("validating")
    AccountManager.checkAll().then(r => {
      if (r.success) {
        setStatus(null);
      } else {
        setStatus(`failed${r.failed === "some" ? "Partially" : ""}`)
      }
      setAccounts(AccountManager.accounts);
    });
  }, [])
  useEffect(() => {
    const listener = (e: any) => {
      const text = e.clipboardData.getData("text");
      const match = tokenRegex.exec(text);
      if (match) {
        const token = match.groups?.token;
        if (!token) return;
        AccountManager.add(token).then(r => {
          if (r?.failed) setStatus("invalidToken");
          setAccounts(AccountManager.accounts)
        });
      }
    };
    addEventListener("paste", listener);
    return () => removeEventListener("paste", listener);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(null)
    }, 3000);
    return () => clearTimeout(timeout)
  }, [status])
  const list = accounts ? Object.entries(accounts) : undefined;
  const toast = toastLabels[status!];
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
              <p>{`Active (verified ${timeFormatter.format((account.cachedOn - now) / 60 | 0, "minutes")})`}</p>
              : <p className="error">Invalid token</p>}
          </div>
        )) : <Loader />}
      </div>
      {toast ? (
        <div className={styles.toast}>
          <span>{toast}</span>
        </div>
      ) : null}
    </div>
  )
}

export default Accounts
