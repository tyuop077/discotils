import styles from "./lookupGuild.module.scss";
import useSWRImmutable from "swr/immutable";
import {DiscordLocalizedStatus, RestForwarderError} from "@utils/restForwarderHandler";
import {fetcherWithStatus, WithStatus} from "@utils/fetcher";
import Loader from "@components/Loader/loader";
import CloudOff from "@assets/CloudOff.svg";
import Logo from "@assets/Logo.svg";
import {GuildPreview, GuildWidget, Invite} from "@utils/discordTypes";
import Warning from "@assets/Warning.svg";
import {GuildCard} from "@components/LookupGuild/guildCard";
import {Snowflake} from "@utils/snowflake";
import {useState} from "react";

const LookupGuild = ({id}: {id: string}) => {
  const valid = /^\d{17,20}$/.test(id) && Snowflake.toTimestamp(id) + BigInt(10000) <= Date.now();
  const [customInviteCode, setCustomInviteCode] = useState<string>();
  const {data: widgetData, error: widgetError} = useSWRImmutable<WithStatus<GuildWidget | RestForwarderError>>(
    valid ? `https://discord.com/api/guilds/${id}/widget.json` : null,
    fetcherWithStatus
  );
  const inviteCode = customInviteCode ||
    (widgetData?.body as GuildWidget)?.instant_invite?.split("/").at(-1);
  const {data: inviteData, error: inviteError} = useSWRImmutable<WithStatus<Invite | RestForwarderError>>(
    inviteCode ? `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true` : null,
    fetcherWithStatus
  );
  const {data: previewData, error: previewError} = useSWRImmutable<WithStatus<GuildPreview | RestForwarderError>>(
    (widgetData?.status === 200 || widgetData?.status === 403) ? `/api/guild/${id}/preview` : null,
    fetcherWithStatus
  );
  return (
    widgetData ? (
      (widgetData.status === 200 || widgetData.status === 403) ? (
        <>
          {(customInviteCode && (id !== (inviteData?.body as Invite)?.guild.id)) && (
            <div className={styles.note}>
              <p>
                Provided code &quot;{customInviteCode}&quot; is not an invite for this guild.
                Expected <code>{id}</code>, got <code>{(inviteData?.body as Invite)?.guild.id}</code>.
                <button
                  onClick={() => setCustomInviteCode(undefined)}
                >
                  Clear code
                </button>
              </p>
            </div>
          )}
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
          {widgetData.status === 403 && previewData?.status === 404 && (
            <div className={styles.note}>
              <Warning />
              <p>
                Guild has no public methods of getting information, so we can&apos;t show you any info about it
              </p>
            </div>
          )}
          <GuildCard
            id={id}
            widget={widgetData.body as GuildWidget}
            invite={inviteData?.body as Invite}
            preview={previewData?.body as GuildPreview}
          />
          {widgetData.status !== 200 && (
            <div className={`${styles.note} ${styles.info}`}>
              <p>
                <span>BETA</span> You can provide an invite code or vanity URL if you have one:
                <input
                  type="text"
                  placeholder="discord-developers"
                  onKeyDown={e => {
                    if (e.key !== "Enter") return;
                    setCustomInviteCode(e.currentTarget.value.split("/").at(-1));
                  }}
                />
              </p>
            </div>
          )}
        </>
      ) : (
        <div className={styles.error}>
          {widgetData.status === 404 ? <Logo /> : <CloudOff />}
          <h3>
            {DiscordLocalizedStatus[widgetData.status](widgetData.body as RestForwarderError, "Guild") ??
              (widgetData.body as RestForwarderError).error}
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
      valid ? <Loader /> : <div className={styles.note}>
        <Warning />
        <p>This snowflake was not yet generated to be a valid guild id</p>
      </div>
    )
  );
}

export default LookupGuild;
