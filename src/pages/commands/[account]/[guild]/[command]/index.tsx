import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccountGuildCommand.module.scss";
import {useRouter} from "next/router";
import useSWRImmutable from "swr/immutable";
import {discordFetcher} from "@utils/discordFetcher";
import {ICommand} from "@utils/command";

const ApplicationCommandsCommand: NextPage = () => {
  const router = useRouter();
  const accountId = router.query.account;
  const guildId = router.query.guild;
  const commandId = router.query.command;
  const {data, error} = useSWRImmutable<ICommand>(
    `/api/commands/${accountId}/${guildId}/${commandId}`,
    discordFetcher
  );
  return (
    <main className={styles.container}>
      <Head>
        <title>Application Commands Editor - Discotils</title>
      </Head>
      {JSON.stringify(data)}
    </main>
  );
}

export default ApplicationCommandsCommand
