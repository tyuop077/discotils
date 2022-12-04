import AccountManager from "@utils/accountManager";
import {cdnImage} from "@utils/cdnImage";

export interface IAccount {
  username?: string;
  name?: string;
  discriminator: string;
  avatar?: string;
  icon?: string;
  tokens: {
    bot?: string;
    bearer?: string;
  }
  secret?: string;
  cachedOn: number;
  active: boolean;
}

export default class Account implements IAccount {
  id: string;
  username?: string;
  name?: string;
  discriminator!: string;
  avatar?: string;
  icon?: string;
  tokens!: {
    bot: string;
    bearer?: string;
  }
  secret?: string;
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
      name: this.name,
      discriminator: this.discriminator,
      avatar: this.avatar,
      icon: this.icon,
      tokens: {
        bot: this.tokens.bot,
        bearer: this.tokens.bearer
      },
      secret: this.secret,
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
      const res = await Account._fetch(this.tokens.bot ?? this.tokens.bearer, this.tokens.bot ? "bot" : "bearer");
      if (res.invalid) {
        this.active = false;
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  static async _fetch(token: string, type: "bot" | "bearer") {
    const res = await fetch(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: `${type === "bearer" ? "Bearer" : "Bot"} ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (res.ok) return {invalid: false, data: await res.json()};
    if (res.status === 401) return {invalid: true};
    throw new Error(`Can't fetch user info (${res.statusText}):\n${await res.text()}`);
  }

  static async _fetchApplication(bearerToken: string) {
    const res = await fetch("https://discord.com/api/v10/oauth2/@me", {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json"
      }
    });
    return {data: (await res.json()).application, invalid: !res.ok};
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

  getAuthHeader(prefers?: "bot" | "bearer") {
    if (prefers === "bearer") return `Bearer ${this.tokens.bearer}`;
    return this.tokens.bot ? `Bot ${this.tokens.bot}` : `Bearer ${this.tokens.bearer}`;
  }

  static async _generateBearer(id: string, secret: string) {
    const res = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "identify applications.commands.update",
        client_id: id,
        client_secret: secret
      })
    });
    const data = await res.json();
    return {data, invalid: !res.ok};
  }

  get image() {
    return cdnImage(
      this.avatar ? "avatars" : this.icon ? "app-icons" : "",
      128,
      this.id,
      this.avatar ?? this.icon,
      {
        discriminator: this.discriminator,
        format: "png"
      });
  }
}
