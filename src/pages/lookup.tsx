import {useState} from "react";
import styles from "@styles/Lookup.module.scss";
import Head from "next/head";
import SnowflakeParser from "@components/SnowflakeParser/snowflakeParser";

const Lookup = () => {
  const [id, setId] = useState("");
  const valid = /^\d{17,20}$/.test(id);
  return (
    <main className={styles.container}>
      <Head>
        <title>Lookup - Discotils</title>
        <meta name="description" content="Snowflake parser, user and server ID resolver" />
      </Head>
      <h1>Snowflake parser & ID resolver</h1>
      <h2>Enter the ID of the user or server to get information about it</h2>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      {valid && (
        <div className={styles.results}>
          <SnowflakeParser id={id} />
        </div>
      )}
    </main>
  );
}

export default Lookup
