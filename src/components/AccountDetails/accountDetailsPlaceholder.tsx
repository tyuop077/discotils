import styles from "./accountsDetails.module.scss";
import Close from "assets/Close.svg";
import TextPlaceholder from "components/TextPlaceholder/textPlaceholder";

const AccountDetailsPlaceholder = () => (
  <div className={styles.account}>
    <button>
      <Close />
    </button>
    <TextPlaceholder />
    <TextPlaceholder />
  </div>
)

export default AccountDetailsPlaceholder
