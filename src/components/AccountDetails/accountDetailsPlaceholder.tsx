import styles from "./accountsDetails.module.scss";
import Close from "assets/Close.svg";
import TextPlaceholder from "components/TextPlaceholder/textPlaceholder";

const AccountDetailsPlaceholder = ({extended}: {extended?: boolean}) => (
  <div className={extended ? styles.extended : styles.selectable}>
    <div className={styles.imagePlaceholder} />
    {extended && <>
      <button>
        <Close />
      </button>
      <TextPlaceholder />
    </>}
    <TextPlaceholder />
  </div>
)

export default AccountDetailsPlaceholder
