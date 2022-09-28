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
  static async refreshAll() {
    const accounts = this.accounts;
    for (const [id, account] of Object.entries(accounts)) {
      if (!account.cachedOn || account.cachedOn < Date.now() - 3600) {
        await this.refresh(id);
      }
    }
  }
  static async fetchUser(token: string) {
    const res = await fetch(`https://discord.com/api/v10/users/@me`, {
      headers: {
        authorization: token,
        contentType: "application/json"
      }
    });
    if (res.ok) return res.json();
    console.error(`Failed to fetch user info (${res.statusText}):\n${await res.text()}`);
  }
  static async refresh(id: string, removeOnFail = false) {
    const accounts = this.accounts;
    const account = accounts[id];
    if (!account || !account.active) return;
    const user = await this.fetchUser(account.token);
    if (!user) {
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
    if (!user) return;
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
