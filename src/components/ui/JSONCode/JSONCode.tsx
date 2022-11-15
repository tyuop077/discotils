import styles from "./JSONCode.module.scss"
import {CopyToClipboard} from "@components/CopyToClipboard/copyToClipboard";
import External from "@assets/External.svg";

export const JSONCode = ({content, title}: {content: any, title?: string}) => {
  return (
    <div className={styles.code}>
      <div className={styles.content}>
        <div className={styles.header}>
          <code>{title ?? "JSON"}</code>
        </div>
        <code>{JSON.stringify(content)}</code>
      </div>
      {content && (
        <div className={styles.tools}>
          <button
            className={styles.external}
            onClick={() => {
              window.open(
                `https://jsoneditoronline.org/#left=json.${encodeURIComponent(JSON.stringify(content))}`,
                "_blank"
              );
            }}
          >
            <External />
          </button>
          <CopyToClipboard text={JSON.stringify(content)} />
        </div>
      )}
    </div>
  )
}
