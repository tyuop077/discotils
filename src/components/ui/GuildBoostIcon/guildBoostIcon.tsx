import styles from "./guildBoostIcon.module.scss";

const GuildBoostIconRaw = ({level, hasBanner}: {level: 1 | 2 | 3, hasBanner?: boolean}) => (
  <div className={styles.icon}>
    <svg width="16" height="16" viewBox="0 0 16 15.2">
      <path fill={(hasBanner && level !== 1) ? "white" : "#4F545CFF"} fillRule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z" />
    </svg>
    <svg width="6" height="11" viewBox="0 0 6 11">
      <g fill={level === 3 ? "#FF73FAFF" : (hasBanner && level !== 1) ? "#A3A6AAFF" : "white"} fillRule="evenodd">
        <path d="M3 0.625244L0 3.62524V7.62524L3 10.6252L6 7.62524V3.62524L3 0.625244ZM5 7.24524L3 9.24524L1 7.24524V4.04524L3 2.04524L5 4.04524V7.24524Z" />
        {level === 2 && (
          <path d="M2 4.42007V6.79007L3 7.79007L4 6.79007V4.42007L3.01 3.42007L2 4.42007Z" />
        )}
        {level === 3 && (
          <>
            <path d="M3.76 4.21526L3 3.45526L2 4.45526V5.97526L3.76 4.21526Z" />
            <path d="M2.28003 7.11532L3.00003 7.83532L4.00003 6.83532V5.39532L2.28003 7.11532Z" />
          </>
        )}
      </g>
    </svg>
  </div>
)

export const GuildBoostIcon = ({boosts, hasBanner}: {boosts?: number, hasBanner?: boolean}) => {
  if (!boosts) return null;
  return <GuildBoostIconRaw level={boosts >= 14 ? 3 : boosts >= 7 ? 2 : 1} hasBanner={hasBanner} />
}
