import styles from "./accountsDetails.module.scss";
import Close from "assets/Close.svg";
import TextPlaceholder from "../Placeholder/textPlaceholder";
import ImagePlaceholder from "../Placeholder/imagePlaceholder";

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
