export enum Flags {
  STAFF,
  PARTNER,
  HYPESQUAD_EVENTS,
  BUG_HUNTER,
  BRAVERY,
  BRILLIANCE,
  BALANCE,
  EARLY_SUPPORTER,
  TEAM_USER,
  SYSTEM,
  BUG_HUNTER_GOLD,
  VERIFIED_BOT,
  EARLY_VERIFIED_BOT_DEVELOPER,
  CERTIFIED_MODERATOR,
  HTTP_INTERACTIONS,
  SPAMMER,
  ACTIVE_DEVELOPER
}

export const bitToFlag = { // public flags
  [1 << 0]: Flags.STAFF,
  [1 << 1]: Flags.PARTNER,
  [1 << 2]: Flags.HYPESQUAD_EVENTS,
  [1 << 3]: Flags.BUG_HUNTER,
  [1 << 6]: Flags.BRAVERY,
  [1 << 7]: Flags.BRILLIANCE,
  [1 << 8]: Flags.BALANCE,
  [1 << 9]: Flags.EARLY_SUPPORTER,
  [1 << 10]: Flags.TEAM_USER,
  [1 << 12]: Flags.SYSTEM,
  [1 << 14]: Flags.BUG_HUNTER_GOLD,
  [1 << 16]: Flags.VERIFIED_BOT,
  [1 << 17]: Flags.EARLY_VERIFIED_BOT_DEVELOPER,
  [1 << 18]: Flags.CERTIFIED_MODERATOR,
  [1 << 19]: Flags.HTTP_INTERACTIONS,
  [1 << 20]: Flags.SPAMMER,
  [1 << 22]: Flags.ACTIVE_DEVELOPER
}

export const publicFlagsToFlags = (publicFlags: number) => {
  const flags = [];
  for (const [bit, flag] of Object.entries(bitToFlag)) {
    if (publicFlags & Number(bit)) flags.push(flag);
  }
  return flags;
}

const flagToPath = (flag: Flags) => (({
  [Flags.STAFF]: "Staff.svg",
  [Flags.PARTNER]: "Partner.svg",
  [Flags.HYPESQUAD_EVENTS]: "hypesquad/Events.svg",
  [Flags.BUG_HUNTER]: "BugHunter.svg",
  [Flags.BRAVERY]: "hypesquad/Bravery.svg",
  [Flags.BRILLIANCE]: "hypesquad/Brilliance.svg",
  [Flags.BALANCE]: "hypesquad/Balance.svg",
  [Flags.EARLY_SUPPORTER]: "EarlySupporter.svg",
  [Flags.BUG_HUNTER_GOLD]: "BugHunterGold.svg",
  [Flags.EARLY_VERIFIED_BOT_DEVELOPER]: "EarlyVerifiedBotDeveloper.svg",
  [Flags.CERTIFIED_MODERATOR]: "CertifiedModerator.svg",
  [Flags.ACTIVE_DEVELOPER]: "ActiveDeveloper.svg"
} as Record<Flags, string>)[flag] ?? null)

const profileBadgesOrder = [
  Flags.STAFF,
  Flags.PARTNER,
  Flags.CERTIFIED_MODERATOR,
  Flags.HYPESQUAD_EVENTS,
  Flags.BRAVERY,
  Flags.BRILLIANCE,
  Flags.BALANCE,
  Flags.BUG_HUNTER,
  Flags.BUG_HUNTER_GOLD,
  Flags.ACTIVE_DEVELOPER,
  Flags.EARLY_VERIFIED_BOT_DEVELOPER,
  Flags.EARLY_SUPPORTER
]

export const profileSortedBadges = (flags: Flags[]) => {
  return flags.sort((a, b) => profileBadgesOrder.indexOf(a) - profileBadgesOrder.indexOf(b));
}


export const flagToComponent = (flag: Flags) => {
  const path = flagToPath(flag);
  if (!path) return null;
  return <img src={`/svg/badges/${path}`} alt={Flags[flag]} />;
}
