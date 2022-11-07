import {Snowflake} from "@utils/snowflake";
import {useMemo, useState} from "react";
import styles from "./snowflakeParser.module.scss";
import ArrowDown from "@assets/ArrowDown.svg";
import {CopyToClipboard} from "@components/CopyToClipboard/copyToClipboard";

interface DateType {
  lang: string;
  timezone?: string;
  dateStyle: "full" | "short";
  timeStyle: "long" | "short" | "full";
}

const SnowflakeParser = ({id}: {id: string}) => {
  const data = useMemo(() => {
    const timestamp = Snowflake.toTimestamp(id);
    const date = new Date(Number(timestamp));
    return {timestamp, date}
  }, [id]);

  const [type, setType] = useState<DateType>({lang: "default", dateStyle: "full", timeStyle: "long"});
  const [show, setShow] = useState(false);
  const str = new Intl.DateTimeFormat(type.lang, { dateStyle: type.dateStyle, timeStyle: type.timeStyle, timeZone: type.timezone }).format(Number(data.timestamp));

  return (
    <div className={styles.snowflake}>
      <p>Timestamp: </p>
      <p className={styles.timestamp}>
        <span>{Number(data.timestamp) / 1000 | 0}</span>
        <small>{String(Number(data.timestamp) % 1000 | 0).padStart(3, "0")}</small>
      </p>
      <p>Created on: </p>
      <span className={styles.date}>
        {data.date.toLocaleString()}
        <CopyToClipboard text={data.timestamp} />
      </span>
      <div className={styles.string}>
        <span>{str}</span>
        <ArrowDown
          className={show ? styles.open : undefined}
          onClick={() => setShow(!show)}
        />
      </div>
      {show && (
        <div className={styles.options}>
          <div className={styles.option}>
            <span>Language</span>
            <div>
              <button
                className={type.lang === "default" ? styles.selected : undefined}
                onClick={() => setType({...type, lang: "default"})}
              >
                Local
              </button>
              <button
                className={type.lang === "en-US" ? styles.selected : undefined}
                onClick={() => setType({...type, lang: "en-US"})}
              >
                English
              </button>
            </div>
          </div>
          <div className={styles.option}>
            <span>Timezone</span>
            <div>
              <button
                className={type.timezone === undefined ? styles.selected : undefined}
                onClick={() => setType({...type, timezone: undefined})}
              >
                Local
              </button>
              <button
                className={type.timezone === "Etc/UTC" ? styles.selected : undefined}
                onClick={() => setType({...type, timezone: "Etc/UTC"})}
              >
                UTC
              </button>
            </div>
          </div>
          <div className={styles.option}>
            <span>Date style</span>
            <div>
              <button
                className={type.dateStyle === "full" ? styles.selected : undefined}
                onClick={() => setType({...type, dateStyle: "full"})}
              >
                Full
              </button>
              <button
                className={type.dateStyle === "short" ? styles.selected : undefined}
                onClick={() => setType({...type, dateStyle: "short"})}
              >
                Short
              </button>
            </div>
          </div>
          <div className={styles.option}>
            <span>Time style</span>
            <div>
              <button
                className={type.timeStyle === "long" ? styles.selected : undefined}
                onClick={() => setType({...type, timeStyle: "long"})}
              >
                Long
              </button>
              <button
                className={type.timeStyle === "short" ? styles.selected : undefined}
                onClick={() => setType({...type, timeStyle: "short"})}
              >
                Short
              </button>
              <button
                className={type.timeStyle === "full" ? styles.selected : undefined}
                onClick={() => setType({...type, timeStyle: "full"})}
              >
                Full
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SnowflakeParser
