import Head from "next/head";
import LookupLayout from "@layout/Lookup/lookup";

const Lookup = () => {
  return (
    <Head>
      <title>Snowflake parser - Discotils</title>
      <meta name="description" content="Discord's snowflake parser" />
    </Head>
  );
}

Lookup.getLayout = LookupLayout;

export default Lookup
