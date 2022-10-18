import styles from "./selector.module.scss";
import SelectorCard from "@components/SelectorCard/selectorCard";
import Lookup from "@assets/Lookup.svg";
import Slash from "@assets/Slash.svg";

const Selector = () => (
  <div className={styles.selector}>
    <SelectorCard title="Lookup" href="/lookup" icon={<Lookup />} label="Snowflake parser and user ID resolver" />
    <SelectorCard title="Application Commands" href="/commands" icon={<Slash />}
                  label="Slash commands and context menus editor" />
  </div>
)

export default Selector
