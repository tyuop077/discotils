import useSWR from 'swr';
import {discordFetcher} from "@utils/discordFetcher";
import AccountManager from "@utils/accountManager";
import Guild, {IGuild} from "@utils/guild";

export const useGuilds = (accountId?: string) => {
  const {data, error} = useSWR(
    accountId ? [`users/@me/guilds`, AccountManager.accounts[accountId].token] : null,
    discordFetcher
  );
  return {
    guilds: (data as IGuild[])?.map(g => new Guild(g)),
    isLoading: !error && !data,
    isError: error
  }
}
