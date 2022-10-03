import styles from "./accountsDetails.module.scss";
import Close from "assets/Close.svg";
import TextPlaceholder from "components/TextPlaceholder/textPlaceholder";

const AccountDetailsPlaceholder = () => (
  <div className={styles.account}>
    <div className={styles.imagePlaceholder} />
    <button>
      <Close />
    </button>
    <TextPlaceholder />
    <TextPlaceholder />
  </div>
)

export default AccountDetailsPlaceholder
