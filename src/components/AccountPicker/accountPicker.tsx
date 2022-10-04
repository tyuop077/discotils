import styles from "./accountPicker.module.scss";
import {useEffect, useState} from "react";
import Loader from "components/Loader/loader";
import AccountManager from "../../utils/accountManager";

const AccountPicker = () => {
  const [open, setOpen] = useState(false);
  const accounts = AccountManager.accounts;
  const ids = Object.keys(accounts);
  const [selected, setSelected] = useState(ids.length === 0 ? "" :
    localStorage.getItem("accounts_selected") ?? ids[0]);
  useEffect(() => {
    setSelected(ids.length === 0 ? "" :
      localStorage.getItem("accounts_selected") ?? ids[0]);
  }, [ids])
  useEffect(() => {
    if (selected) localStorage.setItem("accounts_selected", selected);
  }, [selected])
  const account = accounts[selected];
  return (
    <div className={styles.container}>
      {accounts ? (
        account ? <>
          <img
            src={
              account.avatar ?
                "https://cdn.discordapp.com/avatars/" +
                `${encodeURIComponent(selected)}/${encodeURIComponent(account.avatar)}.webp?size=128` :
                `https://cdn.discordapp.com/embed/avatars/${parseInt(account.discriminator) % 5}.png`
            }
            alt={account.username}
          />
          <span>{account.username}#{account.discriminator}</span>
        </> : <span>Select an account</span>
      ) : <Loader />}
    </div>
  )
}

export default AccountPicker
