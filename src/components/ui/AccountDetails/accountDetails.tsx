import styles from "./accountsDetails.module.scss";
import Account from "@utils/account";
import Close from "@assets/Close.svg";
import TextPlaceholder from "@components/TextPlaceholder/textPlaceholder";
import Link from "next/link";

interface Props {
  account: Account,
  onClose: () => void,
  validating: boolean,
  extended?: boolean,
  href?: string,
  preventTab?: boolean
}

const AccountDetails = ({account, onClose, validating, extended, href, preventTab}: Props) => {
  const timeLabel = new Intl.RelativeTimeFormat("en", {numeric: "auto"})
    .format((account.cachedOn - Date.now() / 1000 | 0) / 60 | 0, "minutes");
  return (
    <Link
      href={href ?? ""}
      className={`${extended ? styles.extended : styles.selectable}${account.active ? "" : ` ${styles.disabled}}`}`}
      tabIndex={preventTab ? -1 : undefined}
    >
      <img
        src={account.image}
        alt={account.username}
      />
      {extended && (
        <button
          onClick={onClose}
        >
          <Close />
        </button>
      )}
      <b>{account.username ?? account.name}</b>
      {account.discriminator && <span>#{account.discriminator}</span>}
      {extended && (
        account.active ?
          <p>
            {validating ?
              <TextPlaceholder />
              : `Active (verified ${timeLabel})`}
          </p>
          : <p className="error">Invalid token</p>
      )}
      <code>{account.id}</code>
    </Link>
  );
}

export default AccountDetails
