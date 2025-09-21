import styles from "./../../page.module.css";

interface SectionHeaderProps {
  text: string;
}

export default function SectionHeader(props: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeaderInnerContainer}>
      <div className={styles.sectionHeaderText}>{props.text}</div>
      <div className={styles.sectionHeaderLine} />
    </div>
  );
}
