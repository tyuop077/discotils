import styles from "./selectorCard.module.scss";
import {ReactNode} from "react";
import Link from "next/link";

interface Props {
  title: string,
  icon: ReactNode,
  href: string,
  label: string
}

const SelectorCard = ({title, icon, href, label}: Props) => (
  <Link
    href={href}
  >
    <a className={styles.card}>
      {icon}
      <h2>{title}</h2>
      <p>{label}</p>
    </a>
  </Link>
)

export default SelectorCard
