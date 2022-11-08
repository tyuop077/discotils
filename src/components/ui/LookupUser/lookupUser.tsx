import styles from "./lookupUser.module.scss";
import useSWRImmutable from "swr/immutable";
import {fetcherWithStatus, WithStatus} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import CloudOff from "@assets/CloudOff.svg";
import UserOff from "@assets/UserOff.svg";

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

interface Error {
  error: string;
  side?: "client" | "server";
}

const CodeToLine: Record<number, (e: Error) => string> = {
  404: () => "User you were looking for doesn't exist",
  429: (e) => `${e.side ? "You are being" : "Server was"} rate limited, please try again later`,
  500: () => "Looks like there's an issue on our end, please report this to the developer",
}

const LookupUser = ({id}: {id: string}) => {
  const {data, error} = useSWRImmutable<WithStatus<User | Error>>(`/api/user/${id}`, fetcherWithStatus);
  return (
    data ? (
      data.status === 200 ? (
        <p>{JSON.stringify(data.body)}</p>
      ) : (
        <div className={styles.error}>
          {data.status === 404 ? <UserOff /> : <CloudOff />}
          <h3>
            {CodeToLine[data.status](data.body as Error) ?? (data.body as Error).error}
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
