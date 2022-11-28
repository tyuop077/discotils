import tryParse from "@utils/tryParse";
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

  static async add(token: string, type: "bot" | "bearer", additionalOptions: Partial<IAccount> = {}) {
    const user = type === "bot" ? await Account._fetch(token, type) : await Account._fetchApplication(token);
    if (user.invalid) return {failed: true};
    if (AccountManager._cache[user.data.id]) {
      AccountManager._cache[user.data.id].update({tokens: {[type]: token}, ...additionalOptions});
    } else {
      AccountManager._cache[user.data.id] = new Account({
          ...additionalOptions,
          ...user.data,
          tokens: {
            [type]: token
          }
        },
        user.data.id
      );
    }
    AccountManager.updateStorage();
  }

  static remove(id: string) {
    const accounts = this.accounts;
    delete accounts[id];
    this.accounts = accounts;
  }

  static async addBearer(id: string, secret: string) {
    const tokenRes = await Account._generateBearer(id, secret);
    if (tokenRes.invalid) return {failed: true};
    const cache = AccountManager.accounts[id];
    if (cache) { // just in case something goes wrong
      cache.update({
        tokens: {
          ...cache.tokens,
          bearer: tokenRes.data.access_token
        },
        secret
      });
      AccountManager.updateStorage();
    }
    await AccountManager.add(tokenRes.data.access_token, "bearer", {secret});
  }
}

export default AccountManager
