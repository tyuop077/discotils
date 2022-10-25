import styles from "./header.module.scss";
import Link from "next/link";
import Logo from "@assets/Logo.svg";
import Lookup from "@assets/Lookup.svg";
import Slash from "@assets/Slash.svg";

const Header = () => (
  <>
    <div className={styles.glow} />
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/" legacyBehavior
          className={styles.logo}
        >
          <Logo className={styles.logo} />
          <a><span>Disco</span>tils</a>
        </Link>
        <div className={styles.nav}>
          <Link href="/lookup" legacyBehavior>
            <Lookup title="Discord Snowflake Parser & User ID Fetcher" />
          </Link>
          <Link href="/commands" legacyBehavior>
            <Slash title="Application Commands" />
          </Link>
        </div>
      </div>
    </header>
  </>
)

export default Header
