import styles from "./selector.module.scss";
import SelectorCard from "@components/SelectorCard/selectorCard";
import Lookup from "@assets/Lookup.svg";
import Slash from "@assets/Slash.svg";
import Wrench from "@assets/Wrench.svg";
import Discord from "@assets/Discord.svg";

const Selector = () => (
  <div className={styles.selector}>
    <SelectorCard title="Lookup" href="/lookup" icon={<Lookup />} label="Snowflake parser, user and server ID resolver" />
    <SelectorCard title="Application Commands" href="/commands" icon={<Slash />}
                  label="Slash commands and context menus editor" />
    <SelectorCard title="Visual builder" href="/builder" icon={<Wrench />}
                  label="Build and export into code" soon />
    <SelectorCard title="Accounts" href="/accounts" icon={<Discord />}
                  label="Manage saved accounts" />
  </div>
)

export default Selector
