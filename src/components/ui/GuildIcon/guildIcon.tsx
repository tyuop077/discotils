import styles from "./guildIcon.module.scss";
import {ReactNode} from "react";

export enum GuildIconType {
  None,
  Verified,
  Partnered
}

const GuildIconContainer = ({children, color, fullSpace}: {children: ReactNode, color: string, fullSpace: boolean}) => (
  <div className={styles.icon}>
    <svg width="16" height="16" viewBox="0 0 16 15.2">
      <path fill={color} fillRule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z" />
    </svg>
    <svg {...fullSpace ? {width: "16", height: "16", viewBox: "0 0 16 16"} : {width: "6", height: "11", viewBox: "0 0 6 11"}}>
      {children}
    </svg>
  </div>
)

const GuildBoostArtifact = ({level, color}: {level: 1 | 2 | 3, color: string}) => (
  <g fill={color} fillRule="evenodd">
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
)

const GuildVerifiedArtifact = () => (
  <path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
)

const GuildSponsoredArtifact = () => (
  <g fill="currentColor">
    <path d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z" />
    <path d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z" />
  </g>
)

const boostsToLevel = (boosts: number) => boosts >= 14 ? 3 : boosts >= 7 ? 2 : 1;

export const GuildIcon = ({boosts, hasBanner, type = GuildIconType.None}: {boosts?: number, hasBanner?: boolean, type?: GuildIconType}) => {
  if (!boosts && type === GuildIconType.None) return null;
  let containerColor = "white", artifactColor = "#A3A6AAFF";
  const level = boostsToLevel(boosts ?? 0);
  if (type === GuildIconType.Verified) containerColor = "#3BA55DFF";
  if (type === GuildIconType.Partnered) containerColor = "#5865F2FF";
  if (type !== GuildIconType.None) artifactColor = "white";
  if (!hasBanner || (type === GuildIconType.None && level === 1)) {
    containerColor = "#4F545CFF";
    artifactColor = "white";
  }
  if (level === 3) artifactColor = "#FF73FAFF";
  return (
    <GuildIconContainer color={containerColor} fullSpace={type !== GuildIconType.None}>
      {type === GuildIconType.Verified ? <GuildVerifiedArtifact /> :
        type === GuildIconType.Partnered ? <GuildSponsoredArtifact /> :
          <GuildBoostArtifact level={level} color={artifactColor} />}
    </GuildIconContainer>
  )
}
