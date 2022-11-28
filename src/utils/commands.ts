import AccountManager from "@utils/accountManager";
import Command, {ICommand} from "@utils/command";
import useSWR from "swr";
import {discordFetcher} from "@utils/discordFetcher";

export const useCommands = (applicationId?: string, guildId?: string) => {
  const {data, error} = useSWR(applicationId && guildId ? [
    `applications/${applicationId}${guildId === "global" ? "" : `/guilds/${guildId}`}/commands?with_localizations=true`,
    AccountManager.accounts[applicationId].getAuthHeader("bearer")
  ] : null, discordFetcher);
  return {
    commands: (data as ICommand[])?.map(c => new Command(c)),
    isLoading: !error && !data,
    isError: error
  }
}
