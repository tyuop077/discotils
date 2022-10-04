import {useEffect, useState} from "react";
import styles from "./accountList.module.scss";
import AccountManager, {Account} from "utils/accountManager";
import AccountDetails from "components/AccountDetails/accountDetails";
import AccountDetailsPlaceholder from "components/AccountDetails/accountDetailsPlaceholder";

const tokenRegex = /^(Bot\s)?(?<token>[\w-]{24}\.[\w-]{6}\.[\w-]{27})/i;
const toastLabels: Record<string, string> = {
  validating: "Validating...",
  failed: "Failed verifying accounts",
  failedPartially: "Failed verifying some accounts",
  invalidToken: "Pasted token is invalid",
  noConnection: "There's a connection issue, please check your access to the internet and try again"
}

const Accounts = ({extended}: {extended?: boolean}) => {
  const [accounts, setAccounts] = useState<Record<string, Account>>();
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    setAccounts(AccountManager.accounts);
    if (!extended) return;
    setStatus("validating")
    AccountManager.checkAll().then(r => {
      setStatus(r.success ? null : `failed${r.failed === "some" ? "Partially" : ""}`)
      setAccounts(AccountManager.accounts);
    }).catch(e => {
      console.error(e);
      setStatus("noConnection")
    });
  }, [extended])
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
        }).catch(e => {
          console.error(e);
          setStatus("noConnection")
        })
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
    <div className={styles.accountList}>
      {list?.length !== 0 && extended ? (
        <h3>Paste a new or existing bot token to add it here</h3>
      ) : null}
      <input
        type="password"
        placeholder="token"
      />
      <div className={styles.accounts}>
        {list ? (
          list.length !== 0 ? (
            list.map(([id, account]) => (
              <AccountDetails
                key={id}
                id={id}
                account={account}
                onClose={() => {
                  AccountManager.remove(id);
                  setAccounts(AccountManager.accounts);
                }}
                validating={status === "validating"}
                extended={extended}
              />
            ))
          ) : (
            <div className={styles.empty}>
              <b>Looks like you haven&apos;t added any accounts yet</b>
              <p>Add one by pasting the new token here</p>
            </div>
          )
        ) : (
          <>
            <AccountDetailsPlaceholder />
            <AccountDetailsPlaceholder />
            <AccountDetailsPlaceholder />
          </>
        )}
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