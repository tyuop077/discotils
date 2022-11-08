import styles from "./lookupUser.module.scss";
import {User} from "@components/LookupUser/lookupUser";
import {CSSProperties} from "react";
import HSBravery from "@assets/HSBravery.svg";
import HSBrilliance from "@assets/HSBrilliance.svg";
import HSBalance from "@assets/HSBalance.svg";

const image = (path: string, size = 128, id: string, hash?: string) => "https://cdn.discordapp.com/" + (hash ?
  `${path}/${id}/${hash}.${hash.startsWith("a_") ? "gif" : "webp"}?size=${size}` :
  `embed/${path}/${Number(id) % 5}.png`);

const colorIntToHex = (color: number) => {
  const hex = color.toString(16);
  return "#" + "0".repeat(6 - hex.length) + hex;
}

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
      <div
        className={data.banner ? styles.banner : styles.accent}
        style={{"--c": colorIntToHex(data.accent_color)} as CSSProperties}
      >
        {data.banner && (
          <img
            src={image("banners", 1024, data.id, data.banner)}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <img
            src={image("avatars", 128, data.id, data.avatar)}
            alt={`${data.username}'s avatar`}
          />
        </div>
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
      </div>
      <b>{data.username}#${data.discriminator}</b>
    </div>
  )
}

export default Profile;
