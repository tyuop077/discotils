import styles from "./lookupUser.module.scss";
import useSWRImmutable from "swr/immutable";
import {User} from "@utils/discordTypes";
import {RestForwarderError, ServerLocalizedStatus} from "@utils/restForwarderHandler";
import {fetcherWithStatus, WithStatus} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import CloudOff from "@assets/CloudOff.svg";
import UserOff from "@assets/UserOff.svg";
import Profile from "@components/LookupUser/profile";

const LookupUser = ({id}: {id: string}) => {
  const {data, error} = useSWRImmutable<WithStatus<User | RestForwarderError>>(
    `/api/user/${id}`, fetcherWithStatus
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
      <Loader />
    )
  );
}

export default LookupUser;
