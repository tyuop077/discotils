import {Snowflake} from "@utils/snowflake";
import {useMemo, useState} from "react";
import styles from "./snowflakeParser.module.scss";
import ArrowDown from "@assets/ArrowDown.svg";

const SnowflakeParser = ({id}: {id: string}) => {
  const data = useMemo(() => {
    const timestamp = Snowflake.toTimestamp(id);
    const date = new Date(Number(timestamp));
    const dateStr = date.toLocaleString();
    return {timestamp, date}
  }, [id]);

  const [type, setType] = useState<{lang: string, timezone?: string}>({lang: "default"});
  const [show, setShow] = useState(false);
  const str = new Intl.DateTimeFormat(type.lang, { dateStyle: "full", timeStyle: "long", timeZone: type.timezone }).format(Number(data.timestamp));

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
      </span>
      <p>Date: {data.date.toLocaleString()}</p>
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
        </div>
      )}
    </div>
  )
}

export default SnowflakeParser
