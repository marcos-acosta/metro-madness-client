import styles from "./../../page.module.css";

interface StopCircleProps {
  color?: string;
}

export default function StopCircle(props: StopCircleProps) {
  return (
    <div
      className={styles.stopCircle}
      style={{
        backgroundColor: props.color || "#fff",
        outlineColor: props.color,
      }}
    />
  );
}
