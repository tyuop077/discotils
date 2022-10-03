import styles from "./accountsDetails.module.scss";
import {Account} from "utils/accountManager";
import Close from "assets/Close.svg";
import TextPlaceholder from "../TextPlaceholder/textPlaceholder";

interface Props {
  id: string,
  account: Account,
  onClose: () => void,
  validating: boolean
}

const AccountDetails = ({id, account, onClose, validating}: Props) => {
  const timeLabel = new Intl.RelativeTimeFormat().format((account.cachedOn - Date.now() / 1000 | 0) / 60 | 0, "minutes");
  return (
    <div className={styles.account}>
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
        onClick={onClose}
      >
        <Close />
      </button>
      <b>{account.username}</b>
      <span>#{account.discriminator}</span>
      {account.active ?
        <p>
          {validating ?
            <TextPlaceholder />
            : `Active (verified ${timeLabel}`}
        </p>
        : <p className="error">Invalid token</p>
      }
    </div>
  )
}

export default AccountDetails
