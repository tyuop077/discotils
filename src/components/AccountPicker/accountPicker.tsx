import styles from "./accountPicker.module.scss";
import {useEffect, useState} from "react";
import tryParse from "utils/tryParse";
import Loader from "components/Loader/loader";

interface Account {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  token: string;
}

const AccountPicker = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Account[]>();
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const accounts = localStorage.getItem("accounts");
    const accounts_selected = BigInt(localStorage.getItem("accounts_selected") ?? 0);
    if (accounts) {
      const accounts_json = tryParse<Account[]>(accounts);
      if (accounts_json) {
        setList(accounts_json);
        if (accounts_selected) {
          setSelected(accounts_json.find(account => account.id === accounts_selected.toString())?.id ?? "");
        }
      } else {
        // TODO: Add error toast
      }
    } else {
      setList([]);
    }
  }, [])
  useEffect(() => {
    if (list) localStorage.setItem("accounts", JSON.stringify(list));
  }, [list])
  useEffect(() => {
    if (selected) localStorage.setItem("accounts_selected", selected);
  }, [selected])
  const account = list ? list.find(account => account.id === selected) : undefined;
  return (
    <div className={styles.container}>
      {list ? (
        account ? <>
          <img
            src={
              account.avatar ?
                "https://cdn.discordapp.com/avatars/" +
                `${encodeURIComponent(account.id)}/${encodeURIComponent(account.avatar)}.webp?size=128` :
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
