import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "assets/Logo.svg";
import Lookup from "assets/Lookup.svg";

const Header = () => (
  <>
    <div className={styles.glow} />
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo className={styles.logo} />
        <a href="#"><span>Disco</span>tils</a>
        <Link href="/lookup">
          <Lookup />
        </Link>
      </div>
    </header>
  </>
)

export default Header
