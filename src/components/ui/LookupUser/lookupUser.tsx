import styles from "./lookupUser.module.scss";
import useSWRImmutable from "swr/immutable";
import {CodeToLine, RestForwarderError} from "@utils/restForwarderHandler";
import {fetcherWithStatus, WithStatus} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import CloudOff from "@assets/CloudOff.svg";
import UserOff from "@assets/UserOff.svg";
import Profile from "@components/LookupUser/profile";

export interface User {
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

const LookupUser = ({id}: {id: string}) => {
  const {data, error} = useSWRImmutable<WithStatus<User | RestForwarderError>>(`/api/user/${id}`, fetcherWithStatus);
  return (
    data ? (
      data.status === 200 ? (
        <Profile data={data.body as User} />
      ) : (
        <div className={styles.error}>
          {data.status === 404 ? <UserOff /> : <CloudOff />}
          <h3>
            {CodeToLine[data.status](data.body as RestForwarderError) ?? (data.body as RestForwarderError).error}
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
