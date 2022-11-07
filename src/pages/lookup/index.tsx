import styles from "@styles/Lookup.module.scss";
import Head from "next/head";
import LookupLayout from "@layout/Lookup/lookup";

const Lookup = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lookup - Discotils</title>
        <meta name="description" content="Snowflake parser" />
      </Head>
    </div>
  );
}

Lookup.getLayout = LookupLayout;

export default Lookup
