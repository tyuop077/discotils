import styles from "./header.module.scss";

const Header = () => (
    <>
        <div className={styles.glow} />
        <header className={styles.header}>
            <div className={styles.container}>
                <a>Discotils</a>
            </div>
        </header>
    </>
)

export default Header
