interface GuildWidgetChannel {
  id: string;
  name: string;
  position: number;
}

interface GuildWidgetMember {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  status: string;
  avatar_url: string;
}

interface GuildWidget {
  id: string;
  name: string;
  instant_invite?: string;
  channels: GuildWidgetChannel[];
  members: GuildWidgetMember[];
}

interface Guild {
  id: string;
  name: string;
  splash?: string;
  banner?: string;
  description?: string;
  icon?: string;
  features: string[];
  verification_level: number;
  vanity_url_code?: string;
  premium_subscription_count?: number;
  nwfw: boolean;
  nsfw_level: number;
  welcome_screen?: {
    description: string;
    welcome_channels: {
      channel_id: string;
      description: string;
      emoji_id: string;
      emoji_name: string;
    }[]
  };
  channel: {
    id: string;
    name: string;
    type: number;
  };
  approximate_member_count: number;
  approximate_presence_count: number;
}

interface Invite {
  code: string;
  type: number;
  expires_at?: string;
  guild: Guild;
}

export class GuildLookup {
  static async byId(id: string) {
    const res = await fetch(`https://discord.com/api/guilds/${id}/widget.json`);
    return await res.json() as GuildWidget;
  }

  static async byInviteCode(code: string) {
    const res = await fetch(`https://discord.com/api/v10/invites/${code}?with_counts=true&with_expiration=true`);
    const data = await res.json() as Invite;
  }
}
