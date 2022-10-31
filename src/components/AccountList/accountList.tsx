import {useEffect, useState} from "react";
import styles from "./accountList.module.scss";
import AccountManager from "@utils/accountManager";
import Account from "@utils/account";
import AccountDetails from "@components/AccountDetails/accountDetails";
import AccountDetailsPlaceholder from "@components/AccountDetails/accountDetailsPlaceholder";

const tokenRegex = /^(Bot\s)?(?<token>[\w-]{24}\.[\w-]{6}\.[\w-]{27})/i;
const toastLabels: Record<string, string> = {
  validating: "Validating...",
  failed: "Failed verifying accounts",
  failedPartially: "Failed verifying some accounts",
  invalidToken: "Pasted token is invalid",
  noConnection: "There's a connection issue, please check your access to the internet and try again",
  added: "Account added"
}

const AccountList = ({extended, to, preventTab}: {extended?: boolean, to?: string, preventTab?: boolean}) => {
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
    if (!extended) return;
    const listener = (e: any) => {
      const text = e.clipboardData.getData("text");
      const match = tokenRegex.exec(text);
      if (match) {
        const token = match.groups?.token;
        if (!token) return;
        AccountManager.add(token).then(r => {
          if (r?.failed) {
            setStatus("invalidToken");
          } else {
            setStatus("added");
          }
          setAccounts(AccountManager.accounts)
        }).catch(e => {
          console.error(e);
          setStatus("noConnection")
        })
      }
    };
    addEventListener("paste", listener);
    return () => removeEventListener("paste", listener);
  }, [extended])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(null)
    }, 3000);
    return () => clearTimeout(timeout)
  }, [status])
  const list = accounts ? Object.entries(accounts) : undefined;
  const toast = toastLabels[status!];
  return (
    <>
      <div className={styles.accountList}>
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
                  href={to?.replace("{}", id)}
                  preventTab={preventTab ?? false}
                />
              ))
            ) : (
              <div className={styles.empty}>
                <b>Looks like you haven&apos;t added any accounts yet</b>
                {extended ? (
                  <p>Add one by pasting the new bot token here</p>
                ) : null}
              </div>
            )
          ) : (
            extended ? (
              <>
                <AccountDetailsPlaceholder extended={extended} />
                <AccountDetailsPlaceholder extended={extended} />
                <AccountDetailsPlaceholder extended={extended} />
              </>
            ) : null
          )}
        </div>
        {toast ? (
          <div className={styles.toast}>
            <span>{toast}</span>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default AccountList
