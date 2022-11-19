import styles from "./scrollCard.module.scss";
import {ReactNode} from "react";

interface Props {
  children: ReactNode;
  title: string;
}

const ScrollCard = ({children, title}: Props) => {
  return (
    <div className={styles.card}>
      <p>{title}</p>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default ScrollCard
