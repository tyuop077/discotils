import styles from "./copyToClipboard.module.scss";
import {useState} from "react";
import Clipboard from "@assets/Clipboard.svg";

export const CopyToClipboard = ({text}: {text: string}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return (
    <div className={styles.copyToClipboard}>
      <button onClick={copyToClipboard}>
        <Clipboard />
        <span className={styles.tooltip}>
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </span>
      </button>
    </div>
  );
}
