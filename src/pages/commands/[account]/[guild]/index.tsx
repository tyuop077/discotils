import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccountGuild.module.scss";
import {useRouter} from "next/router";
import Slash from "@assets/Slash.svg";
import Link from "next/link";
import {useCommands} from "@utils/commands";
import Loader from "@components/Loader/loader";
import Plus from "@assets/Plus.svg";
import AccountManager from "@utils/accountManager";

const ApplicationCommandsGuild: NextPage = () => {
  const router = useRouter();
  const accountId = router.query.account;
  const guildId = router.query.guild;
  const {commands, isLoading, isError} = useCommands(
    typeof accountId === "string" ? accountId : undefined,
    typeof guildId === "string" ? guildId : undefined
  );
  return (
    <main className={styles.container}>
      <Head>
        <title>Application Commands Editor - Discotils</title>
      </Head>
      <div className={styles.menu}>
        <div className={styles.commandsPicker}>
          <Link
            href={`/commands/${accountId}/${guildId}/new`}
            className={styles.command}
          >
            <Plus />
            <p>Create new</p>
          </Link>
          {commands && (
            commands.map((command) => (
              <Link
                href={`/commands/${accountId}/${guildId}/${command.id}`}
                key={command.id}
                className={styles.command}
              >
                <Slash />
                <div>
                  <p>{command.name}</p>
                  <span>{command.description}</span>
                </div>
              </Link>
            ))
          )}
          {isLoading && (
            <Loader />
          )}
          {isError && (
            AccountManager.accounts[accountId as string].tokens.bearer ?
              <p>Something went wrong</p> : <p>Use bearer token to see commands</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ApplicationCommandsGuild
