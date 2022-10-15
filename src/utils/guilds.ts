import useSWR from 'swr';
import {fetcher} from "@utils/fetcher";
import AccountManager from "@utils/accountManager";
import Guild, {IGuild} from "@utils/guild";

export const useGuilds = (accountId?: string) => {
  if (!accountId) throw new Error("No account id provided");
  const {data, error} = useSWR([`users/@me/guilds`, AccountManager.accounts[accountId].token], fetcher);
  return {
    guilds: (data as IGuild[])?.map(g => new Guild(g)),
    isLoading: !error && !data,
    isError: error
  }
}
