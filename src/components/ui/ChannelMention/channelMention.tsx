import styles from "./channelMention.module.scss";
import Channel from "@assets/Channel.svg";
import {FC} from "react";

export const ChannelMention: FC<any> = ({children, ...props}) => (
  <a className={styles.channel} {...props}
  >
    <Channel />
    {children}
  </a>
)
