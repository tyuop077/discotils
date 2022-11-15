import {User} from "@components/LookupUser/lookupUser";

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

interface Emoji {
  id: string;
  name: string;
  roles?: string[];
  user?: User;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

interface Sticker {
  id: string;
  name: string;
  description: string;
  tags: string;
  type: 2;
  format_type: number;
  available?: boolean;
  guild_id: string;
}

interface GuildPreview {
  id: string;
  name: string;
  icon: string;
  splash: string;
  discovery_splash: string;
  emojis: Emoji[];
  features: string[];
  approximate_member_count: number;
  approximate_presence_count: number;
  description: string;
  stickers: Sticker[];
}

class GuildLookupWithStatus {
  static async byId(id: string) {
    const res = await fetch(`https://discord.com/api/guilds/${id}/widget.json`);
    const body = await res.json() as GuildWidget;
    return {status: res.status, body};
  }

  static async byInviteCode(code: string) {
    const res = await fetch(`https://discord.com/api/v10/invites/${code}?with_counts=true&with_expiration=true`);
    const body = await res.json() as Invite;
    return {status: res.status, body};
  }

  static async byPreview(id: string) {
    const res = await fetch(`/api/guild/${id}/preview`);
    const body = await res.json() as GuildPreview;
    return {status: res.status, body};
  }
}

export const GuildLookup = () => ({
  withStatus: GuildLookupWithStatus
})
