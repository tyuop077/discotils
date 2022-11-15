import styles from "./lookupUser.module.scss";
import {User} from "@components/LookupUser/lookupUser";
import {CSSProperties} from "react";
import {Flags, flagToComponent, profileSortedBadges, publicFlagsToFlags} from "@utils/userFlags";
import Check from "@assets/Check.svg";
import Warning from "@assets/Warning.svg";
import {JSONCode} from "@components/JSONCode/JSONCode";

const image = (path: string, size = 128, id: string, hash?: string, discriminator?: string) => "https://cdn.discordapp.com/" + (hash ?
  `${path}/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "webp"}?size=${size}` :
  `embed/${path}/${Number(discriminator) % 5}.png`);

const colorIntToHex = (color: number) =>
  "#" + color.toString(16).padStart(6, "0");

export const Profile = ({data}: {data: User}) => {
  const flags = profileSortedBadges(publicFlagsToFlags(data.public_flags));
  const badges = flags.map(flagToComponent);
  return (
    <div className={styles.user}>
      {data.banner ? (
        <div className={styles.banner}>
          <img
            src={image("banners", 1024, data.id, data.banner)}
          />
          <div className={styles.bannerOverlay}>
            <a
              className={styles.original}
              href={image("banners", 2048, data.id, data.banner)}
              target="_blank"
              rel="noreferrer"
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
          href={image("avatars", 2048, data.id, data.avatar, data.discriminator)}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={image("avatars", 128, data.id, data.avatar, data.discriminator)}
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
