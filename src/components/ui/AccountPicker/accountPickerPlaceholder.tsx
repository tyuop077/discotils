import TextPlaceholder from "@components/TextPlaceholder/textPlaceholder";
import styles from "./accountPicker.module.scss";
import ArrowDown from "@assets/ArrowDown.svg";

const AccountPicker = () => (
  <div className={styles.list}>
    <div className={styles.imagePlaceholder} />
    <span><TextPlaceholder /></span>
    <ArrowDown />
  </div>
)

export default AccountPicker
