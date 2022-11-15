import styles from "./lookupGuild.module.scss";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import {JSONCode} from "@components/JSONCode/JSONCode";

interface Props {
  id: string;
  widget: GuildWidget;
  invite: Invite;
  preview: GuildPreview;
}

export const GuildCard = ({id, widget, invite, preview}: Props) => {
  return (
    <div className={styles.guild}>
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
