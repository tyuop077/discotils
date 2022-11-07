import styles from "./copyToClipboard.module.scss";
import {useEffect, useState} from "react";
import Clipboard from "@assets/Clipboard.svg";

export const CopyToClipboard = ({text}: {text: string}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsCopied(false);
  }, [text])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return (
    <div className={styles.copyToClipboard}>
      <button onClick={copyToClipboard}>
        <Clipboard />
        {isCopied ? (
          <div className={styles.tooltip}>
            Copied!
          </div>
        ) : null}
      </button>
    </div>
  );
}
