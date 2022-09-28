import styles from "./header.module.scss";
import Logo from "assets/Logo.svg";
import ID from "assets/ID.svg";

const Header = () => (
  <>
    <div className={styles.glow} />
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo className={styles.logo} />
        <a href="#"><span>Disco</span>tils</a>
        <ID className={styles.id} />
      </div>
    </header>
  </>
)

export default Header
