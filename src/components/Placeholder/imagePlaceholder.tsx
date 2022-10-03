import styles from "./placeholder.module.scss";

const ImagePlaceholder = ({size}: {size: number}) => (
  // @ts-ignore
  <div className={styles.imagePlaceholder} style={{"--size": `${size}`}} />
)

export default ImagePlaceholder
