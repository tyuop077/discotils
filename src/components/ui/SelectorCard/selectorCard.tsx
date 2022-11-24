import styles from "./selectorCard.module.scss";
import {ReactNode} from "react";
import Link from "next/link";

interface Props {
  title: string;
  icon: ReactNode;
  href: string;
  label: string;
  soon?: boolean;
}

const SelectorCard = ({title, icon, href, label, soon}: Props) => (
  <Link
    href={href}
    className={styles.card}
  >
    {icon}
    <h2>
      {title}
      {soon && (
        <div className={styles.soon}>
          <span>soon</span>
        </div>
      )}
    </h2>
    <p>{label}</p>
  </Link>
)

export default SelectorCard
