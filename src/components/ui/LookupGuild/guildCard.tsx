import styles from "./lookupGuild.module.scss";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import {JSONCode} from "@components/JSONCode/JSONCode";
import {cdnImage} from "@utils/cdnImage";
import {GuildBoostIcon} from "@components/GuildBoostIcon/guildBoostIcon";

interface Props {
  id: string;
  widget?: GuildWidget;
  invite?: Invite;
  preview?: GuildPreview;
}

export const GuildCard = ({id, widget, invite, preview}: Props) => {
  const guild = {...invite?.guild, ...preview};
  return (
    <div className={styles.guild}>
      {guild.banner && (
        <div
          className={[styles.banner,
            (guild.premium_subscription_count ?? 0) <= 7 ? styles.disabledBanner : null].filter(s => s).join(" ")}
        >
          <img
            src={cdnImage("banners", 1024, id, guild.banner)}
          />
          <div className={styles.bannerOverlay}>
            {/*{(guild.premium_subscription_count ?? 0) <= 7 && (
              <span>Guild must have at least 7 boosts to enable banner</span>
            )}*/}
            <a
              className={styles.original}
              href={cdnImage("banners", 2048, id, guild.banner, {
                format: "png"
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original
            </a>
          </div>
        </div>
      )}
      <div className={styles.content}>
        {guild.icon ? (
          <img
            className={styles.avatar}
            src={cdnImage("icons", 128, id, guild.icon)}
          />
        ) : guild.name && (
          <div
            className={styles.avatar}
          >
            {guild.name.split(" ").map(s => s[0]).join("")}
          </div>
        )}
        <div className={styles.details}>
          <div className={styles.title}>
            <b>{preview?.name ?? widget?.name}</b>
            <GuildBoostIcon boosts={guild.premium_subscription_count} hasBanner={Boolean(guild.banner)} />
          </div>
          {guild.premium_subscription_count}
        </div>
      </div>
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
      <JSONCode title={`GET /guild/${id}/preview`} content={preview} />
    </div>
  )
}
