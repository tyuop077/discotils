import styles from "@styles/Lookup.module.scss";
import Head from "next/head";
import LookupLayout from "@layout/Lookup/lookup";
import {useRouter} from "next/router";
import LookupGuild from "@components/LookupGuild/lookupGuild";

const Lookup = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const valid = /^\d{17,20}$/.test(id);
  return <>
    <Head>
      <title>Guild Lookup - Discotils</title>
      <meta name="description" content="Discord guild id resolver and snowflake parser" />
    </Head>
    {valid && (
      <div className={styles.container}>
        <LookupGuild id={id} />
      </div>
    )}
  </>
}

Lookup.getLayout = LookupLayout;

export default Lookup
