import {MutableRefObject, ReactElement, useEffect, useRef, useState} from "react";
import styles from "./lookup.module.scss";
import SnowflakeParser from "@components/SnowflakeParser/snowflakeParser";
import LookupLink from "@components/LookupLink/lookupLink";
import createLookupLink from "@components/LookupLink/lookupLink";
import {useRouter} from "next/router";

const LookupLayout = (page: ReactElement) => {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const valid = /^\d{17,20}$/.test(id);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const initialId = router.query.id;

  useEffect(() => {
    if (typeof initialId !== "string") return;
    setId(initialId);
    inputRef.current!.value = initialId;
  }, [initialId]);

  const {LookupLink} = createLookupLink({activeClass: styles.active, id});

  return (
    <main className={styles.container}>
      <h1>Snowflake parser & ID resolver</h1>
      <h2>Enter the ID of the user or server to get information about it</h2>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="ID"
          ref={inputRef}
          onChange={(e) => {
            const value = e.target.value;
            router.replace(`${router.pathname}?id=${value}`, router.pathname, {
              shallow: true
            });
            setId(value);
          }}
        />
        <div className={styles.type}>
          <LookupLink href="">
            Snowflake
          </LookupLink>
          <LookupLink href="/user">
            User
          </LookupLink>
          <LookupLink href="/guild">
            Server
          </LookupLink>
        </div>
      </div>
      {valid && (
        <div className={styles.results}>
          <SnowflakeParser
            id={id}
            maximizedByDefault={router.pathname === "/lookup"}
          />
        </div>
      )}
      {page}
    </main>
  );
}

export default LookupLayout
