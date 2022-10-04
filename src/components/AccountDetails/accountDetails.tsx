import styles from "./accountsDetails.module.scss";
import {Account} from "utils/accountManager";
import Close from "assets/Close.svg";
import TextPlaceholder from "@components/TextPlaceholder/textPlaceholder";
import Link from "next/link";

interface Props {
  id: string,
  account: Account,
  onClose: () => void,
  validating: boolean,
  extended?: boolean,
  href?: string
}

const AccountDetails = ({id, account, onClose, validating, extended, href}: Props) => {
  const timeLabel = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
    .format((account.cachedOn - Date.now() / 1000 | 0) / 60 | 0, "minutes");
  return (
    <Link
      href={href ?? ""}
    >
      <div
        className={`${extended ? styles.extended : styles.selectable}${account.active ? "" : ` ${styles.disabled}}`}`}
      >
        <img
          src={
            account.avatar ?
              "https://cdn.discordapp.com/avatars/" +
              `${encodeURIComponent(id)}/${encodeURIComponent(account.avatar)}.webp?size=128` :
              `https://cdn.discordapp.com/embed/avatars/${parseInt(account.discriminator) % 5}.png`
          }
          alt={account.username}
        />
        {extended && (
          <button
            onClick={onClose}
          >
            <Close />
          </button>
        )}
        <b>{account.username}</b>
        <span>#{account.discriminator}</span>
        {extended && (
          account.active ?
            <p>
              {validating ?
                <TextPlaceholder />
                : `Active (verified ${timeLabel})`}
            </p>
            : <p className="error">Invalid token</p>
        )}
        <code>{id}</code>
      </div>
    </Link>
  )
}

export default AccountDetails
