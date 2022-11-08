import styles from "@styles/LookupUser.module.scss";
import Head from "next/head";
import LookupLayout from "@layout/Lookup/lookup";
import {useRouter} from "next/router";
import LookupUser from "@components/LookupUser/lookupUser";

const Lookup = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const valid = /^\d{17,20}$/.test(id); // will be a string if it's true
  return (
    <>
      <Head>
        <title>User Lookup - Discotils</title>
        <meta name="description" content="Discord user id resolver and snowflake parser" />
      </Head>
      {valid && (
        <div className={styles.container}>
          <LookupUser id={id} />
        </div>
      )}
    </>
  );
}

Lookup.getLayout = LookupLayout;

export default Lookup
