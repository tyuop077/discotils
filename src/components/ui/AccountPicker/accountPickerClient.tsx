import styles from "./accountPicker.module.scss";
import {useEffect, useState} from "react";
import Loader from "@components/Loader/loader";
import AccountManager from "@utils/accountManager";
import {useRouter} from "next/router";
import ArrowDown from "@assets/ArrowDown.svg";
import AccountList from "@components/AccountList/accountList";

const AccountPicker = () => {
  const router = useRouter();
  const account_id = router.query.account;
  const [open, setOpen] = useState(false);
  const accounts = AccountManager.accounts;
  const account = typeof account_id === "string" ? accounts[account_id] : undefined;
  useEffect(() => {
    if (account_id && !account) router.push("/commands");
  }, [account_id, account])
  useEffect(() => {
    setOpen(false);
  }, [account_id])
  return (
    <div className={styles.picker}>
      <div
        className={`${styles.list}${open ? ` ${styles.open}` : ""}`}
        onClick={() => setOpen(!open)}
      >
        {accounts ? (
          account && typeof account_id === "string" ? <>
            <img
              src={
                account.avatar ?
                  "https://cdn.discordapp.com/avatars/" +
                  `${encodeURIComponent(account_id)}/${encodeURIComponent(account.avatar)}.webp?size=128` :
                  `https://cdn.discordapp.com/embed/avatars/${parseInt(account.discriminator) % 5}.png`
              }
              alt={account.username}
            />
            <span>{account.username}#{account.discriminator}</span>
            <ArrowDown />
          </> : <span>Select an account</span>
        ) : <Loader />}
      </div>
      {open && (
        <div className={styles.dropdown}>
          <AccountList to="/commands/{}"/>
        </div>
      )}
    </div>
  )
}

export default AccountPicker
