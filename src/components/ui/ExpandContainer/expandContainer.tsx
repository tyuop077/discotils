import styles from "./expandContainer.module.scss";
import {ReactNode, useState} from "react";
import ArrowDown from "@assets/ArrowDown.svg";

interface Props {
  children: ReactNode;
  title: string | ((open: boolean) => string);
  defaultOpen?: boolean;
}

const ExpandContainer = ({children, title, defaultOpen = false}: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <>
      <div className={`${styles.head}${open ? "" : ` ${styles.collapsed}`}`}>
        <h4>{typeof title === "string" ? title : title(open)}</h4>
        <button
          onClick={() => setOpen(!open)}
        >
          <ArrowDown className={open ? undefined : styles.collapsed} />
        </button>
      </div>
      {open && children}
    </>
  );
}

export default ExpandContainer
