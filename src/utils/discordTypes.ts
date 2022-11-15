export interface User {
  id: string;
  username: string;
  avatar?: string;
  bot?: boolean;
  avatar_decoration?: string;
  discriminator: string;
  public_flags: number;
  banner?: string;
  banner_color: string;
  accent_color: number;
}

export interface GuildWidgetChannel {
  id: string;
  name: string;
  position: number;
}

export interface GuildWidgetMember {
  username: string;
  status: "online" | "dnd" | "idle" | "offline";
  avatar_url: string;
}

export interface GuildWidget {
  id: string;
  name: string;
  instant_invite?: string;
  channels: GuildWidgetChannel[];
  members: GuildWidgetMember[];
}

export interface Guild {
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
  approximate_member_count: number;
  approximate_presence_count: number;
}

export interface Invite {
  code: string;
  type: number;
  expires_at?: string;
  guild: Guild;
  channel: {
    id: string;
    name: string;
    type: number;
  };
}

export interface Emoji {
  id: string;
  name: string;
  roles?: string[];
  user?: User;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export interface Sticker {
  id: string;
  name: string;
  description: string;
  tags: string;
  type: 2;
  format_type: number;
  available?: boolean;
  guild_id: string;
}

export interface GuildPreview {
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
