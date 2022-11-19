import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "@assets/Logo.svg";
import Lookup from "@assets/Lookup.svg";
import Slash from "@assets/Slash.svg";
import GitHub from "@assets/GitHub.svg";

const Header = () => (
  <>
    <div className={styles.glow} />
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Logo className={styles.logo} />
          <span>Disco</span>tils
        </Link>
        <div className={styles.nav}>
          <Link href="/lookup" title="Discord Snowflake Parser & User ID Fetcher">
            <Lookup />
          </Link>
          <Link href="/commands" title="Application Commands">
            <Slash />
          </Link>
        </div>
        <div className={styles.navR}>
          <Link href="https://github.com/tyuop077/discotils" title="GitHub">
            <GitHub />
          </Link>
        </div>
      </div>
    </header>
  </>
)

export default Header
