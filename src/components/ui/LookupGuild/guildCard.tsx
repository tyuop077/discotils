import styles from "./lookupGuild.module.scss";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import {JSONCode} from "@components/JSONCode/JSONCode";
import {cdnImage} from "@utils/cdnImage";
import {GuildIcon, GuildIconType} from "@components/GuildIcon/guildIcon";
import ExpandContainer from "@components/ExpandContainer/expandContainer";
import Warning from "@assets/Warning.svg";
import Check from "@assets/Check.svg";
import External from "@assets/External.svg";
import ScrollCard from "@components/ScrollCard/scrollCard";

interface Props {
  id: string;
  widget?: GuildWidget;
  invite?: Invite;
  preview?: GuildPreview;
}

const nsfwLevelString = {
  0: "None",
  1: "Explicit",
  2: "Safe",
  3: "Age Restricted"
}

const verificationLevelString = {
  0: "None - unrestricted",
  1: "Low - must have verified email on account",
  2: "Medium - must be registered on Discord for longer than 5 minutes",
  3: "High - must be a member of the server for longer than 10 minutes", // (╯°□°）╯︵ ┻━┻
  4: "Very High - must have a verified phone number" // ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻
}

export const GuildCard = ({id, widget, invite, preview}: Props) => {
  const guild = {
    ...{
      approximate_member_count: invite?.approximate_member_count,
      approximate_presence_count: invite?.approximate_presence_count,
    }, ...invite?.guild, ...preview};
  const guildIconType = guild.features?.includes("VERIFIED") ? GuildIconType.Verified :
    guild.features?.includes("PARTNERED") ? GuildIconType.Partnered : GuildIconType.None;
  return (
    <>
      {guild.banner && (
        <div
          className={[
            styles.banner,
            guild.features?.includes("BANNER") ? null : styles.disabledBanner
          ].filter(s => s).join(" ")}
        >
          <img
            src={cdnImage("banners", 1024, id, guild.banner)}
          />
          <div className={styles.bannerOverlay}>
            {!guild.features?.includes("BANNER") && (
              <span>Serves has banner disabled</span>
            )}
            <a
              className={styles.original}
              href={cdnImage("banners", 2048, id, guild.banner, {
                format: "png"
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original banner
            </a>
          </div>
        </div>
      )}
      {guild.splash && (
        <div className={styles.splash}>
          <img
            src={cdnImage("splashes", 1024, id, guild.splash)}
          />
        </div>
      )}
      <div
        className={[styles.content, guild.banner ? null : styles.noBanner].filter(s => s).join(" ")}
      >
        {guild.icon ? (
          <a
            href={cdnImage("icons", 2048, id, guild.icon, {format: "png"})}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.avatar}
              src={cdnImage("icons", 128, id, guild.icon)}
            />
          </a>
        ) : guild.name && (
          <div
            className={styles.avatar}
          >
            {guild.name.split(" ").map(s => s[0]).join("")}
          </div>
        )}
        <div className={styles.details}>
          <div className={styles.row}>
            <b>{guild.name}</b>
            <GuildIcon
              boosts={guild.premium_subscription_count}
              hasBanner={Boolean(guild.banner)}
              type={guildIconType}
            />
          </div>
          <div className={styles.block}>
            {guild.approximate_presence_count && (
              <div className={styles.row}>
                <div className={`${styles.status} ${styles.online}`} />
                {guild.approximate_presence_count} online
              </div>
            )}
            {guild.approximate_member_count && (
              <div className={styles.row}>
                <div className={`${styles.status} ${styles.offline}`} />
                {guild.approximate_member_count} members
              </div>
            )}
          </div>
        </div>
      </div>
      <p>{guild.description}</p>
      {guild.premium_subscription_count && (
        <span className={styles.row}>
          <GuildIcon boosts={guild.premium_subscription_count} />
          Boosts: {guild.premium_subscription_count}
        </span>
      )}
      {guildIconType !== GuildIconType.None && (
        <span className={styles.row}>
          <GuildIcon type={guildIconType} />
          {guildIconType === GuildIconType.Verified && "Verified"}
          {guildIconType === GuildIconType.Partnered && "Discord Partner"}
        </span>
      )}
      {guild.nsfw && (
        <div className={styles.row}>
          <Warning width={20} />
          <span>NSFW</span>
        </div>
      )}
      {(guild.nsfw_level !== undefined) && (
        <div className={styles.d}>
          {guild.nsfw_level === 1 || guild.nsfw_level === 3 ? <Warning width={20} /> : <Check width={20} />}
          <span>
            NSFW Level: {guild.nsfw_level} ({nsfwLevelString[guild.nsfw_level]})
          </span>
        </div>
      )}
      {(guild.verification_level !== undefined) && (
        <div className={styles.d}>
          {guild.verification_level === 0 ? <Warning /> : <Check/>}
          <span>
            Verification level: {guild.verification_level} ({verificationLevelString[guild.verification_level]})
          </span>
        </div>
      )}
      {(guild.vanity_url_code || widget?.instant_invite) && (
        <div className={`${styles.d} ${styles.invite}`}>
          <External />
          <a
            href={guild.vanity_url_code ? `https://discord.gg/${guild.vanity_url_code}` : widget?.instant_invite}
          >
            discord.gg/<span>{[guild.vanity_url_code, widget?.instant_invite?.split("/").at(-1)].filter(c => c).join(", ")}</span>
          </a>
        </div>
      )}
      <div className={styles.cards}>
        {guild.emojis && (
          <ScrollCard title="Emojis">
            <div className={styles.emojis}>
              {guild.emojis.map(e => (
                <a
                  key={e.id}
                  href={cdnImage("emojis", 1024, e.id, null, {
                    format: e.animated ? "gif" : "png",
                    noHash: true
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={cdnImage("emojis", 128, e.id, null, {
                      format: e.animated ? "gif" : "png",
                      noHash: true
                    })}
                    alt={e.name}
                  />
                </a>
              ))}
            </div>
          </ScrollCard>
        )}
        {guild.stickers && (
          <ScrollCard title="Stickers">
            <div className={styles.stickers}>
              {guild.stickers.map(s => (
                <a
                  key={s.id}
                  href={cdnImage("stickers", 1024, s.id, null, {
                    format: "png",
                    noHash: true
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={cdnImage("stickers", 128, s.id, null, {
                      format: "png",
                      noHash: true
                    })}
                    alt={s.name}
                  />
                </a>
              ))}
            </div>
          </ScrollCard>
        )}
        {guild.features && (
          <ScrollCard title="Features">
            <ul className={styles.flexGap}>
              {guild.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </ScrollCard>
        )}
      </div>
      <ExpandContainer title="Requests">
        <p>Guild Widget</p>
        <JSONCode title={`GET /guilds/${id}/widget.json`} content={widget} />
        <p>Guild Invite</p>
        <JSONCode
          title={widget?.instant_invite ?
            `GET /invites/${widget.instant_invite.split("/").at(-1)}?with_counts=true&with_expiration=true` :
            (widget?.id) ? "Widget has no instant invites because vanity url exists or invites were suspended" :
              "Widget was disabled for this guild"}
          content={invite}
        />
        <p>Guild Preview</p>
        <JSONCode title={`GET /guilds/${id}/preview`} content={preview} />
      </ExpandContainer>
    </>
  )
}
