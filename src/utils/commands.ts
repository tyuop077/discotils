import AccountManager from "@utils/accountManager";
import Command, {ICommand} from "@utils/command";
import useSWR from "swr";
import {fetcher} from "@utils/fetcher";

export const useCommands = (applicationId?: string, guildId?: string) => {
  const {data, error} = useSWR(applicationId && guildId ? [
    `applications/${applicationId}${guildId === "global" ? "" : `/guilds/${guildId}`}/commands?with_localizations=true`,
    AccountManager.accounts[applicationId].token
  ] : null, fetcher);
  return {
    commands: (data as ICommand[])?.map(c => new Command(c)),
    isLoading: !error && !data,
    isError: error
  }
}
