import styles from "@styles/LookupUser.module.scss";
import Head from "next/head";
import LookupLayout from "@layout/Lookup/lookup";
import {useRouter} from "next/router";
import useSWRImmutable from "swr/immutable";
import {fetcher} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import Logo from "@assets/Logo.svg";
import CloudOff from "@assets/CloudOff.svg";

interface User {
  id: string;
  username: string;
  avatar?: string;
  bot?: boolean;
  avatar_decoration?: string;
  discriminator: string;
  public_flags: number;
  banner?: string;
  banner_color: string;
  accent_color: number;
}

const Lookup = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const valid = /^\d{17,20}$/.test(id); // will be string is its true
  const {data, error} = useSWRImmutable<User>(id ? `/api/user/${id}` : null, fetcher);
  return (
    <>
      <Head>
        <title>User Lookup - Discotils</title>
        <meta name="description" content="Discord user id resolver and snowflake parser" />
      </Head>
      {valid && (
        <div className={styles.container}>
          {data ? (
            /*<p>{JSON.stringify(data)}</p>*/
            <div className={styles.error}>
              <Logo />
              <h3>
                Not found
              </h3>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <CloudOff />
              <h3>
                Looks like there&apos;s a connection issue, please check your access to the internet and try again
              </h3>
            </div>
          ) : <Loader />}
        </div>
      )}
    </>
  );
}

Lookup.getLayout = LookupLayout;

export default Lookup
