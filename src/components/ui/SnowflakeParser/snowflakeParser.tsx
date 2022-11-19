import {Snowflake} from "@utils/snowflake";
import {useEffect, useMemo, useState} from "react";
import styles from "./snowflakeParser.module.scss";
import {CopyToClipboard} from "@components/CopyToClipboard/copyToClipboard";
import formatTime from "@utils/formatTime";
import ExpandContainer from "@components/ExpandContainer/expandContainer";

interface DateType {
  lang: string;
  timezone?: string;
  dateStyle: "full" | "short";
  timeStyle: "long" | "short" | "full";
}

const SnowflakeParser = ({id, maximizedByDefault}: {id: string, maximizedByDefault: boolean}) => {
  const data = useMemo(() => {
    const timestamp = Snowflake.toTimestamp(id);
    const date = new Date(Number(timestamp));
    return {timestamp, date}
  }, [id]);

  const [type, setType] = useState<DateType>({lang: "default", dateStyle: "full", timeStyle: "long"});

  const str = new Intl.DateTimeFormat(type.lang, {
    dateStyle: type.dateStyle,
    timeStyle: type.timeStyle,
    timeZone: type.timezone
  }).format(Number(data.timestamp));
  const relativeStr = formatTime(Number(data.timestamp), type.lang);

  useEffect(() => {
    const dateType = localStorage.getItem("snowflakeParserDate");
    if (dateType) setType(JSON.parse(dateType));
  }, [])

  const updateType = (value: Partial<DateType>) => {
    const updatedType = {...type, ...value};
    setType(updatedType);
    localStorage.setItem("snowflakeParserDate", JSON.stringify(updatedType));
  }

  return (
    <div className={styles.snowflake}>
      <ExpandContainer
        title={(open) => open ? "Snowflake" : `Snowflake (created on ${data.date.toLocaleString()})`}
        defaultOpen={maximizedByDefault}
      >
        <p>Timestamp: </p>
        <div className={styles.timestamp}>
          <span>{Math.floor(Number(data.timestamp) / 1000)}</span>
          <small>{String(Number(data.timestamp) % 1000 | 0).padStart(3, "0")}</small>
          <CopyToClipboard text={data.timestamp} />
        </div>
        <p>Created on: </p>
        <span className={styles.date}>
            {data.date.toLocaleString()}
          <CopyToClipboard text={data.timestamp} />
          </span>
        <ExpandContainer title={`${str} (${relativeStr})`}>
          <div className={styles.options}>
            <div className={styles.option}>
              <span>Language</span>
              <div>
                <button
                  className={type.lang === "default" ? styles.selected : undefined}
                  onClick={() => updateType({lang: "default"})}
                >
                  Local
                </button>
                <button
                  className={type.lang === "en-US" ? styles.selected : undefined}
                  onClick={() => updateType({lang: "en-US"})}
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
                  onClick={() => updateType({timezone: undefined})}
                >
                  Local
                </button>
                <button
                  className={type.timezone === "Etc/UTC" ? styles.selected : undefined}
                  onClick={() => updateType({timezone: "Etc/UTC"})}
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
                  onClick={() => updateType({dateStyle: "full"})}
                >
                  Full
                </button>
                <button
                  className={type.dateStyle === "short" ? styles.selected : undefined}
                  onClick={() => updateType({dateStyle: "short"})}
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
                  onClick={() => updateType({timeStyle: "long"})}
                >
                  Long
                </button>
                <button
                  className={type.timeStyle === "short" ? styles.selected : undefined}
                  onClick={() => updateType({timeStyle: "short"})}
                >
                  Short
                </button>
                <button
                  className={type.timeStyle === "full" ? styles.selected : undefined}
                  onClick={() => updateType({timeStyle: "full"})}
                >
                  Full
                </button>
              </div>
            </div>
          </div>
        </ExpandContainer>
      </ExpandContainer>
    </div>
  )
}

export default SnowflakeParser
