import styles from "./lookupUser.module.scss";
import useSWRImmutable from "swr/immutable";
import {User} from "@utils/discordTypes";
import {RestForwarderError, ServerLocalizedStatus} from "@utils/restForwarderHandler";
import {fetcherWithStatus, WithStatus} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import CloudOff from "@assets/CloudOff.svg";
import UserOff from "@assets/UserOff.svg";
import Profile from "@components/LookupUser/profile";
import {Snowflake} from "@utils/snowflake";
import Warning from "@assets/Warning.svg";

const LookupUser = ({id}: {id: string}) => {
  const valid = /^\d{17,20}$/.test(id) && Snowflake.toTimestamp(id) + BigInt(10000) <= Date.now();
  const {data, error} = useSWRImmutable<WithStatus<User | RestForwarderError>>(
    valid ? `/api/user/${id}` : null, fetcherWithStatus
  );
  return (
    data ? (
      data.status === 200 ? (
        <Profile data={data.body as User} />
      ) : (
        <div className={styles.error}>
          {data.status === 404 ? <UserOff /> : <CloudOff />}
          <h3>
            {ServerLocalizedStatus[data.status](data.body as RestForwarderError, "User") ?? (data.body as RestForwarderError).error}
          </h3>
        </div>
      )
    ) : error ? (
      <div className={styles.error}>
        <CloudOff />
        <h3>
          Looks like there&apos;s a connection issue, please check your access to the internet and try again
        </h3>
      </div>
    ) : (
      valid ? <Loader /> : <div className={styles.note}>
        <Warning />
        <p>This snowflake was not yet generated to be a valid user id</p>
      </div>
    )
  );
}

export default LookupUser;
