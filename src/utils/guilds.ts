import AccountManager from "@utils/accountManager";
import Guild from "@utils/guild";

export class Guilds {
  static async getGuilds(accountId: string) {
    const res = await AccountManager.accounts[accountId].rest(`users/@me/guilds`);
    if (res.ok) return (await res.json() as []).map(g => new Guild(g));
  }
}
