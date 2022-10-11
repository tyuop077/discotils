import tryParse from "./tryParse";
import Account, {IAccount} from "@utils/account";

class AccountManager {
  static _cache: Record<string, Account>;
  static get accounts(): Record<string, Account> {
    if (this._cache) return this._cache;
    this._cache = {};
    const accounts = localStorage.getItem("accounts");
    if (!accounts) return {};
    const accounts_json = tryParse<Record<string, IAccount>>(accounts);
    if (!accounts_json) {
      console.error(`Failed to parse accounts`);
      return {};
    }
    const res = Object.entries(accounts_json)
      .reduce((acc, [id, data]) => ({...acc, [id]: new Account(data, id)}), {});
    this._cache = res;
    return res
  }
  static set accounts(accounts: Record<string, Account>) {
    this._cache = accounts;
    this.updateStorage();
  }
  static updateStorage() {
    localStorage.setItem("accounts", JSON.stringify(this._cache));
  }
  static async checkAll() {
    const accounts = this.accounts;
    const now = Date.now() / 1000 | 0;
    let failed = 0;
    for (const account of Object.values(accounts)) {
      if (!account.cachedOn || account.cachedOn < now - 3600) {
        try {
          await account.checkValidity();
        } catch (e) {
          console.error(`Failed verifying ${account.username}`, e);
          failed++;
        }
      }
    }
    if (failed !== 0) {
      if (failed === Object.keys(accounts).length) {
        return {success: false, failed: "all"}
      } else {
        return {success: false, failed: "some"}
      }
    }
    AccountManager.updateStorage();
    return {success: true}
  }
  static async add(token: string) {
    const user = await Account._fetch(token);
    if (user.invalid) return {failed: true};
    AccountManager._cache[user.data.id] = new Account({...user.data, token}, user.data.id);
    AccountManager.updateStorage();
  }
  static remove(id: string) {
    const accounts = this.accounts;
    delete accounts[id];
    this.accounts = accounts;
  }
}

export default AccountManager
