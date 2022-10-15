import AccountManager from "@utils/accountManager";
import {fetcher} from "@utils/fetcher";

export interface IAccount {
  username: string;
  discriminator: string;
  avatar?: string;
  token: string;
  cachedOn: number;
  active: boolean;
}

export default class Account implements IAccount {
  id: string;
  username!: string;
  discriminator!: string;
  avatar?: string;
  token!: string;
  cachedOn!: number;
  active = true;
  constructor(data: IAccount, id: string) {
    Object.assign(this, data);
    this.id = id;
    if (!data.cachedOn) this._updateCachedOn();
  }
  toJSON() {
    return {
      username: this.username,
      discriminator: this.discriminator,
      avatar: this.avatar,
      token: this.token,
      cachedOn: this.cachedOn,
      active: this.active ? undefined : false
    };
  }
  update(data?: Partial<IAccount>) {
    if (data) Object.assign(this, data);
    AccountManager.accounts[this.id] = this;
  }
  _updateCachedOn() {
    this.cachedOn = Date.now() / 1000 | 0;
  }
  async fetch() {
    try {
      const res = await Account._fetch(this.token);
      if (res.invalid) {
        this.active = false;
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }
  static async _fetch(token: string) {
    const res = await fetch(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (res.ok) return {invalid: false, data: await res.json()};
    if (res.status === 401) return {invalid: true};
    throw new Error(`Can't fetch user info (${res.statusText}):\n${await res.text()}`);
  }
  async checkValidity(removeOnFail = false) {
    if (!this.active) return;
    const user = await this.fetch();
    if (!this.active) {
      if (removeOnFail) delete AccountManager.accounts[this.id];
      this.update({active: false});
    } else {
      this._updateCachedOn();
      this.update({
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar
      })
    }
  }
  /** @deprecated */
  rest(path: string, method = "GET", options: RequestInit = {}) {
    return fetcher(path, this.token, method, options);
  }
}
