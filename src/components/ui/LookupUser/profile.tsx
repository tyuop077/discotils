import styles from "./lookupUser.module.scss";
import {User} from "@utils/discordTypes";
import {CSSProperties} from "react";
import {Flags, flagToComponent, profileSortedBadges, publicFlagsToFlags} from "@utils/userFlags";
import {cdnImage} from "@utils/cdnImage";
import Check from "@assets/Check.svg";
import Warning from "@assets/Warning.svg";
import {colorIntToHex} from "@utils/colorIntToHex";
import {JSONCode} from "@components/JSONCode/JSONCode";

export const Profile = ({data}: {data: User}) => {
  const flags = profileSortedBadges(publicFlagsToFlags(data.public_flags));
  const badges = flags.map(flagToComponent);
  return (
    <div className={styles.user}>
      {data.banner ? (
        <div className={styles.banner}>
          <img
            src={cdnImage("banners", 1024, data.id, data.banner)}
          />
          <div className={styles.bannerOverlay}>
            <a
              className={styles.original}
              href={cdnImage("banners", 2048, data.id, data.banner)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original
            </a>
          </div>
        </div>
      ) : (
        <div
          className={styles.accent}
          style={data.accent_color ? {"--c": colorIntToHex(data.accent_color)} as CSSProperties : undefined}
        />
      )}
      <div className={styles.info}>
        <a
          className={styles.avatar}
          href={cdnImage("avatars", 2048, data.id, data.avatar, {
            discriminator: data.discriminator,
            format: "png"
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={cdnImage("avatars", 128, data.id, data.avatar, {discriminator: data.discriminator})}
            alt={`${data.username}'s avatar`}
          />
        </a>
        {badges.filter(b => b).length > 0 && (
          <div className={styles.badges}>
            {badges}
          </div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.name}>
          <b>{data.username}</b>
          <span>#{data.discriminator}</span>
          {(data.bot || flags.includes(Flags.SYSTEM)) && (
            <div className={styles.tag}>
              {flags.includes(Flags.VERIFIED_BOT) && <Check />}
              <span>
                {data.bot && "BOT"}
                {flags.includes(Flags.SYSTEM) && "SYSTEM"}
              </span>
            </div>
          )}
          {(flags.includes(Flags.HTTP_INTERACTIONS) || flags.includes(Flags.TEAM_USER)) && (
            <div className={`${styles.tag} ${styles.minor}`}>
              {flags.includes(Flags.HTTP_INTERACTIONS) && <span>HTTP Interactions</span>}
              {flags.includes(Flags.TEAM_USER) && <span>TEAM USER</span>}
            </div>
          )}
        </div>
        <div className={styles.data}>
          {data.banner_color && (
            <div className={styles.value}>
              <span>Banner color:</span>
              <div
                className={styles.color}
                style={{"--c": data.banner_color} as CSSProperties}
              />
              <p>{data.banner_color}</p>
            </div>
          )}
          {flags.includes(Flags.SPAMMER) && (
            <div className={styles.note}>
              <Warning />
              <span>This user is tagged as spammer</span>
            </div>
          )}
          {data.accent_color && (
            <div className={styles.value}>
              <span>Accent color:</span>
              <div
                className={styles.color}
                style={{"--c": colorIntToHex(data.accent_color)} as CSSProperties}
              />
              <p
                title="Click to copy"
                onClick={() => navigator.clipboard.writeText(colorIntToHex(data.accent_color))}
              >
                {colorIntToHex(data.accent_color)}
              </p>
            </div>
          )}
          <JSONCode title={`GET /users/${data.id}`} content={data} />
        </div>
      </div>
    </div>
  )
}

export default Profile;
