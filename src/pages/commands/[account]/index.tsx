import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccount.module.scss";
import AccountPicker from "@components/AccountPicker/accountPicker";
import {useEffect, useState} from "react";
import {Guilds} from "@utils/guilds";
import {useRouter} from "next/router";
import Guild from "@utils/guild";
import Slash from "@assets/Logo.svg";

const Commands: NextPage = () => {
  const router = useRouter();
  const accountId = router.query.account;
  const [guilds, setGuilds] = useState<Guild[]>();
  useEffect(() => {
    if (typeof accountId !== "string") return;
    Guilds.getGuilds(accountId).then((guilds) => {
      if (!guilds) return;
      setGuilds(guilds);
    });
  }, [accountId]);
  return (
    <main className={styles.container}>
      <Head>
        <title>Application Commands Editor - Discotils</title>
        <meta name="description" content="Discord slash commands, user and message context menus editor.
        Register and edit commands and interactions, add localization with Discotils application commands builder." />
      </Head>
      <div className={styles.menu}>
        <AccountPicker />
        <div className={styles.guildsPicker}>
          {guilds && (
            guilds.map((guild) => (
              <div key={guild.id} className={styles.guild}>
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

export default Commands
