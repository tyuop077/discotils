interface User {
  id: string;
  username: string;
  avatar?: string;
  avatar_decoration?: string;
  discriminator: string;
  public_flags: number;
  banner?: string;
  banner_color: string;
  accent_color: number;
}

export class UserLookup {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  async fetch() {
    const res = await fetch(`/api/user/${this.id}`);
    return await res.json() as User;
  }
}
