import AccountManager from "@utils/accountManager";
import Command, {ICommand} from "@utils/command";
import useSWR from "swr";
import {fetcher} from "@utils/fetcher";

export const useCommands = (applicationId?: string, guildId?: string) => {
  if (!applicationId) throw new Error("No application id provided");
  if (!guildId) throw new Error("No guild id provided");
  const {data, error} = useSWR([
    `applications${guildId === "global" ? `/guilds/${guildId}` : ""}/${applicationId}/commands?with_localizations=true`,
    AccountManager.accounts[applicationId].token
  ], fetcher);
  return {
    commands: (data as ICommand[])?.map(c => new Command(c)),
    isLoading: !error && !data,
    isError: error
  }
}
