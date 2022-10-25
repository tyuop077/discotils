import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccountGuild.module.scss";
import {useRouter} from "next/router";
import Slash from "@assets/Slash.svg";
import Link from "next/link";
import {useCommands} from "@utils/commands";
import Loader from "@components/Loader/loader";

const ApplicationCommands: NextPage = () => {
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
        <meta name="description" content="Discord slash commands, user and message context menus editor.
        Register and edit commands and interactions, add localization with Discotils application commands builder." />
      </Head>
      <div className={styles.menu}>
        <div className={styles.commandsPicker}>
          {commands && (
            commands.map((command) => (
              <Link
                href={`/commands/${accountId}/${guildId}/${command.id}`}
                key={command.id}
                className={styles.command}
              >
                <div className={styles.icon}>
                  <Slash />
                </div>
                <p>{command.name}</p>
              </Link>
            ))
          )}
          {isLoading && (
            <Loader />
          )}
          {isError && (
            <p>Something went wrong</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default ApplicationCommands
