import styles from "./lookupGuild.module.scss";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import {JSONCode} from "@components/JSONCode/JSONCode";
import {cdnImage} from "@utils/cdnImage";

interface Props {
  id: string;
  widget?: GuildWidget;
  invite?: Invite;
  preview?: GuildPreview;
}

export const GuildCard = ({id, widget, invite, preview}: Props) => {
  return (
    <div className={styles.guild}>
      {preview?.splash && (
        <div className={styles.splash}>
          <img
            src={cdnImage("splashes", 1024, id, preview.splash)}
          />
          <div className={styles.splashOverlay}>
            <a
              className={styles.original}
              href={cdnImage("splashes", 2048, id, preview.splash, {
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
      <div className={styles.name}>
        {(invite?.guild.icon || preview?.icon) ? (
          <img
            className={styles.avatar}
            src={cdnImage("icons", 128, id, invite?.guild.icon || preview?.icon)}
          />
        ) : (
          <div
            className={styles.avatar}
          >
            {invite?.guild.name.split(" ").map(s => s[0]).join("")}
          </div>
        )}
        <b>{preview?.name ?? widget?.name}</b>
      </div>
      <p>Guild Widget</p>
      <JSONCode title={`GET /guilds/${id}/widget.json`} content={widget} />
      <p>Guild Invite</p>
      <JSONCode
        title={widget.instant_invite ?
          `GET /invites/${widget.instant_invite}?with_counts=true&with_expiration=true` :
          (widget.id) ? "Widget has no instant invites because vanity url exists or invites were suspended" :
            "Widget was disabled for this guild"}
        content={invite}
      />
      <p>Guild Preview</p>
      <JSONCode title={`GET /guild/${id}/preview`} content={preview} />
    </div>
  )
}
