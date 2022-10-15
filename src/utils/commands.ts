import AccountManager from "@utils/accountManager";
import Command, {ICommand} from "@utils/command";

export default class Commands {
  static async getCommands(applicationId: string, guildId: string): Promise<Command[]> {
    const account = AccountManager.accounts[applicationId];
    const res = await account.rest(`applications${guildId === "global" ? `/guilds/${guildId}` : ""}/${applicationId}/commands?with_localizations=true`);
    const json: ICommand[] = await res.json();
    return json.map(c => new Command(c));
  }
}
