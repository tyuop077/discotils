import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccountGuild.module.scss";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Slash from "@assets/Slash.svg";
import Link from "next/link";
import Command from "@utils/command";
import Commands from "@utils/commands";
let once = ""; // react strict dev environment

const ApplicationCommands: NextPage = () => {
  const router = useRouter();
  const accountId = router.query.account;
  const guildId = router.query.guild;
  const [commands, setCommands] = useState<Command[]>();
  useEffect(() => {
    if (once === `${accountId}${guildId}`) return;
    once = `${accountId}${guildId}`;
    if (typeof accountId !== "string") return;
    if (typeof guildId !== "string") return;
    Commands.getCommands(accountId, guildId).then((commands) => {
      if (!commands) return;
      setCommands(commands);
    });
  }, [accountId, guildId]);
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
              >
                <div className={styles.command}>
                  <div className={styles.icon}>
                    <Slash />
                  </div>
                  <p>{command.name}</p>
                </div>
              </Link>
            ))
          )}
          </div>
        </div>
      <div className={styles.commandsPicker}>
        <Slash />
        <h3>Select a server on the left</h3>
      </div>
    </main>
  )
}

export default ApplicationCommands
