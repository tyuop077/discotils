import styles from "./lookupGuild.module.scss";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import {JSONCode} from "@components/JSONCode/JSONCode";

export const GuildCard = ({widget, invite, preview}: {widget: GuildWidget, invite: Invite, preview: GuildPreview}) => {
  return (
    <div className={styles.guild}>
      <p>Guild Widget</p>
      <JSONCode title={`GET /guilds/${widget.id}/widget.json`} content={widget} />
      <p>Guild Invite</p>
      <JSONCode
        title={widget.instant_invite ?
          `GET /invites/${widget.instant_invite}?with_counts=true&with_expiration=true` :
          "Widget has invites disabled because vanity url exists or invites were suspended"}
        content={invite}
      />
      <p>Guild Preview</p>
      <JSONCode title={`GET /guild/${widget.id}/preview`} content={preview} />
    </div>
  )
}
