import styles from "./lookupUser.module.scss";
import {User} from "@components/LookupUser/lookupUser";
import {CSSProperties} from "react";
import HSBravery from "@assets/HSBravery.svg";
import HSBrilliance from "@assets/HSBrilliance.svg";
import HSBalance from "@assets/HSBalance.svg";

const image = (path: string, size = 128, id: string, hash?: string) => "https://cdn.discordapp.com/" + (hash ?
  `${path}/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "webp"}?size=${size}` :
  `embed/${path}/${Number(id) % 5}.png`);

const colorIntToHex = (color: number) =>
  "#" + color.toString(16).padStart(6, "0");

enum Flags {
  BRAVERY,
  BRILLIANCE,
  BALANCE,
  TEAM_USER
}

const bitToFlag = {
  [1 << 6]: Flags.BRAVERY,
  [1 << 7]: Flags.BRILLIANCE,
  [1 << 8]: Flags.BALANCE,
  [1 << 10]: Flags.TEAM_USER
}

const publicFlagsToFlags = (publicFlags: number) => {
  const flags = [];
  for (const [bit, flag] of Object.entries(bitToFlag)) {
    if (publicFlags & Number(bit)) flags.push(flag);
  }
  return flags;
}

export const Profile = ({data}: {data: User}) => {
  const flags = publicFlagsToFlags(data.public_flags);
  return (
    <div className={styles.user}>
      {data.banner ? (
        <div className={styles.banner}>
          <img
            src={image("banners", 1024, data.id, data.banner)}
          />
        </div>
      ) : (
        <div
          className={styles.accent}
          style={data.accent_color ? {"--c": colorIntToHex(data.accent_color)} as CSSProperties : undefined}
        />
      )}
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img
            src={image("avatars", 128, data.id, data.avatar)}
            alt={`${data.username}'s avatar`}
          />
        </div>
        {flags.length > 0 && (
          <div className={styles.badges}>
            {flags.map(flag => {
              switch (flag) {
                case Flags.BRAVERY:
                  return <HSBravery />;
                case Flags.BRILLIANCE:
                  return <HSBrilliance />;
                case Flags.BALANCE:
                  return <HSBalance />;
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.name}>
          <b>{data.username}</b>
          <span>#{data.discriminator}</span>
          {data.bot && <p className={styles.label}>BOT</p>}
          {flags.includes(Flags.TEAM_USER) && <p className={styles.label}>TEAM USER</p>}
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
          <code>{JSON.stringify(data)}</code>
        </div>
      </div>
    </div>
  )
}

export default Profile;
