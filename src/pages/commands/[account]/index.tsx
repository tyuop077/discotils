import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccount.module.scss";
import AccountPicker from "@components/AccountPicker/accountPicker";
import {useGuilds} from "@utils/guilds";
import {useRouter} from "next/router";
import Logo from "@assets/Logo.svg";
import Link from "next/link";
import Wrench from "@assets/Wrench.svg";
import Loader from "@components/Loader/loader";
import AccountManager from "@utils/accountManager";

const ApplicationCommandsAccount: NextPage = () => {
  const router = useRouter();
  const accountId = router.query.account;
  const {guilds, isLoading, isError} = useGuilds(typeof accountId === "string" ? accountId : undefined);
  return (
    <main className={styles.container}>
      <Head>
        <title>Application Commands Editor - Discotils</title>
      </Head>
      <div className={styles.menu}>
        <AccountPicker />
        <div className={styles.guildsPicker}>
          <Link
            href={`/commands/${accountId}/global`}
            className={styles.guild}
          >
            <div className={styles.global}>
              <Wrench />
            </div>
            <p>Global</p>
          </Link>
          <input
            className={styles.input}
            placeholder="Guild id"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/commands/${accountId}/${e.currentTarget.value}`);
              }
            }}
          />
          {guilds && (
            guilds.map((guild) => (
              <Link
                href={`/commands/${accountId}/${guild.id}`}
                key={guild.id}
              >
                <div className={styles.guild}>
                  {guild.icon ? (
                    <img
                      src={guild.avatarURL!}
                      alt={guild.name}
                    />
                  ) : (
                    <div className={styles.icon}>
                      <span>{guild.avatarInitials}</span>
                    </div>
                  )}
                  <p>{guild.name}</p>
                </div>
              </Link>
            ))
          )}
          {isLoading && (
            <Loader />
          )}
          {isError && (
            AccountManager.accounts[accountId as string].tokens.bot ?
              <p>Something went wrong</p> :
              <p>Guilds can&apos;t be fetched without bot token, but you may pass guild id instead</p>
          )}
        </div>
      </div>
      <div className={styles.commandsPicker}>
        <Logo />
        <h3>Select a server on the left</h3>
      </div>
    </main>
  );
}

export default ApplicationCommandsAccount
