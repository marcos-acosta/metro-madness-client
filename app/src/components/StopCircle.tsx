import styles from "./../../page.module.css";

interface StopCircleProps {
  visited?: boolean;
}

export default function StopCircle(props: StopCircleProps) {
  return <div className={styles.stopCircle}></div>;
}
