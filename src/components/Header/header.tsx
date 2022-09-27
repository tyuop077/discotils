import styles from "./header.module.scss";
import Logo from "assets/Logo.svg";

const Header = () => (
  <>
    <div className={styles.glow} />
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo className={styles.logo} />
        <a href="#"><span>Disco</span>tils</a>
      </div>
    </header>
  </>
)

export default Header
