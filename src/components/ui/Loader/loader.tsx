import styles from "./loader.module.scss";

const Loader = () => (
    <div className={styles.loader}>
        <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
    </div>
)

export default Loader
