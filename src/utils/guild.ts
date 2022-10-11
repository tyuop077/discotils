export interface IGuild {
  id: string;
  name: string;
  icon?: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export default class Guild implements IGuild {
  id!: string;
  name!: string;
  icon?: string;
  owner!: boolean;
  permissions!: string;
  features!: string[];
  constructor(data: IGuild) {
    Object.assign(this, data);
  }
  get avatarURL() {
    return this.icon ? `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.webp?size=256` : null;
  }
  get avatarInitials() {
    return this.name.split(" ").map(s => s[0]).join("");
  }
}
