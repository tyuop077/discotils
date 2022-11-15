import styles from "./lookupGuild.module.scss";
import useSWRImmutable from "swr/immutable";
import {CodeToLine, RestForwarderError} from "@utils/restForwarderHandler";
import {fetcherWithStatus, WithStatus} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import CloudOff from "@assets/CloudOff.svg";
import Logo from "@assets/Logo.svg";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import Warning from "@assets/Warning.svg";
import {GuildCard} from "@components/LookupGuild/guildCard";

const LookupGuild = ({id}: {id: string}) => {
  const {data: widgetData, error: widgetError} = useSWRImmutable<WithStatus<GuildWidget | RestForwarderError>>(
    `https://discord.com/api/guilds/${id}/widget.json`, fetcherWithStatus
  );
  const {data: inviteData, error: inviteError} = useSWRImmutable<WithStatus<Invite | RestForwarderError>>(
    (widgetData?.body as GuildWidget)?.instant_invite ?
      `https://discord.com/api/v10/invites/${(widgetData?.body as GuildWidget).instant_invite}` +
      "?with_counts=true&with_expiration=true" : null,
    fetcherWithStatus
  );
  const {data: previewData, error: previewError} = useSWRImmutable<WithStatus<GuildPreview | RestForwarderError>>(
    (widgetData?.body as GuildWidget)?.id ? `/api/guild/${id}/preview` : null, fetcherWithStatus
  );
  return (
    widgetData ? (
      widgetData.status === 200 ? (
        // TODO: Add guild profile
        <>
          {(inviteError || previewError) && (
            <div className={styles.note}>
              <Warning />
              <p>
                Failed to fetch{" "}
                {[inviteError ?? "invite info", previewError ?? "preview info"].filter(t => t).join(" and ")}
                , please check your access to the internet and try again
              </p>
            </div>
          )}
          <GuildCard
            widget={widgetData.body as GuildWidget}
            invite={inviteData?.body as Invite}
            preview={previewData?.body as GuildPreview}
          />
        </>
      ) : (
        <div className={styles.error}>
          {widgetData.status === 404 ? <Logo /> : <CloudOff />}
          <h3>
            {CodeToLine[widgetData.status](widgetData.body as RestForwarderError, "Guild") ?? (widgetData.body as RestForwarderError).error}
          </h3>
        </div>
      )
    ) : widgetError ? (
      <div className={styles.error}>
        <CloudOff />
        <h3>
          Looks like there&apos;s a connection issue, please check your access to the internet and try again
        </h3>
      </div>
    ) : (
      <Loader />
    )
  );
}

export default LookupGuild;
