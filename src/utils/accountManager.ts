import tryParse from "./tryParse";

export interface Account {
  username: string;
  discriminator: string;
  avatar: string;
  token: string;
  cachedOn: number;
  active: boolean;
}

class AccountManager {
  static get accounts(): Record<string, Account> {
    const accounts = localStorage.getItem("accounts");
    if (!accounts) return {};
    const accounts_json = tryParse<Record<string, Account>>(accounts);
    if (!accounts_json) {
      console.error(`Failed to parse accounts`);
      return {};
    }
    return accounts_json;
  }
  static set accounts(accounts: Record<string, Account>) {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
  static async checkAll() {
    const accounts = this.accounts;
    const now = Date.now() / 1000 | 0;
    let failed = 0;
    for (const [id, account] of Object.entries(accounts)) {
      if (!account.cachedOn || account.cachedOn < now - 3600) {
        try {
          await this.checkValidity(id);
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
    return {success: true}
  }
  static async fetchUser(token: string) {
    console.trace(`doing the fetch for ${token}`);
    const res = await fetch(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (res.ok) return res.json();
    console.error(`Failed to fetch user info (${res.statusText}):\n${await res.text()}`);
    return {invalid: true}
  }
  static async checkValidity(id: string, removeOnFail = false) {
    const accounts = this.accounts;
    const account = accounts[id];
    if (!account || !account.active) return;
    if (!account.token) {
      delete accounts[id];
      this.accounts = accounts;
      return
    }
    const user = await this.fetchUser(account.token);
    if (user.invalid) {
      if (removeOnFail) delete accounts[id];
      account.active = false;
    } else {
      account.username = user.username;
      account.discriminator = user.discriminator;
      account.avatar = user.avatar;
      account.cachedOn = Date.now() / 1000 | 0;
    }
    this.accounts = accounts;
  }
  static async add(token: string) {
    const accounts = this.accounts;
    const user = await this.fetchUser(token);
    if (user.failed) return {failed: true};
    accounts[user.id] = {
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      token,
      cachedOn: Date.now() / 1000 | 0,
      active: true
    }
    this.accounts = accounts;
  }
  static remove(id: string) {
    const accounts = this.accounts;
    delete accounts[id];
    this.accounts = accounts;
  }
}

export default AccountManager
