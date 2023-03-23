import {NextPage} from "next";
import Head from "next/head";
import styles from "@styles/CommandsAccountGuildCommand.module.scss";
import {useRouter} from "next/router";
import useSWRImmutable from "swr/immutable";
import {discordFetcher} from "@utils/discordFetcher";
import Command, {ICommand} from "@utils/command";
import AccountManager from "@utils/accountManager";

const ApplicationCommandsCommand: NextPage = () => {
  const router = useRouter();
  const accountId = router.query.account;
  const guildId = router.query.guild;
  const commandId = router.query.command;
  const {data, error} = useSWRImmutable<ICommand>(
    (commandId !== "new" && accountId && guildId && commandId) ? [
      `applications/${accountId}/guilds/${guildId}/commands/${commandId}`,
      AccountManager.accounts[accountId as string].getAuthHeader("bot")
      ] : null,
    discordFetcher
  );
  const command = data ? new Command(data) : null;
  return (
    <main className={styles.container}>
      <Head>
        <title>Application Commands Editor - Discotils</title>
      </Head>
      <h1>Application Commands Editor</h1>
      <label>Type</label>
      <select defaultValue={command?.type}>
        <option value="1">Chat input</option>
        <option value="2">Context menu (user)</option>
        <option value="3">Context menu (message)</option>
      </select>
      <label>Name</label>
      <input
        placeholder="Command name"
        defaultValue={command?.name}
      />
      <label>Description</label>
      <input
        placeholder="Command description"
        defaultValue={command?.description}
        maxLength={100}
      />
      <label>Options</label>
      <div className={styles.options}>
        {command?.options?.map((option, index) => (
          <div key={index} className={styles.option}>
            <label>Type</label>
            <select defaultValue={option.type}>
              <option value="1">Subcommand</option>
              <option value="2">Subcommand group</option>
              <option value="3">String</option>
              <option value="4">Integer</option>
              <option value="5">Boolean</option>
              <option value="6">User</option>
              <option value="7">Channel</option>
              <option value="8">Role</option>
              <option value="9">Mentionable</option>
            </select>
            <label>Name</label>
            <input
              placeholder="Option name"
              defaultValue={option.name}
            />
            <label>Description</label>
            <input
              placeholder="Option description"
              defaultValue={option.description}
              maxLength={100}
            />
            <label>Required</label>
            <input
              type="checkbox"
              defaultChecked={option.required}
            />
            <label>Choices</label>
            <div className={styles.choices}>
              {option.choices?.map((choice, index) => (
                <div key={index} className={styles.choice}>
                  <label>Name</label>
                  <input
                    placeholder="Choice name"
                    defaultValue={choice.name}
                  />
                  <label>Value</label>
                  <input
                    placeholder="Choice value"
                    defaultValue={choice.value}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <label>Create an option</label>
      <select>
        <option value="1">Subcommand</option>
        <option value="2">Subcommand group</option>
        <option value="3">String</option>
        <option value="4">Integer</option>
        <option value="5">Boolean</option>
        <option value="6">User</option>
        <option value="7">Channel</option>
        <option value="8">Role</option>
        <option value="9">Mentionable</option>
      </select>
      <button>Save</button>

    </main>
  );
}

export default ApplicationCommandsCommand
