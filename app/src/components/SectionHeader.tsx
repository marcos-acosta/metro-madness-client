import styles from "./../../page.module.css";

interface SectionHeaderProps {
  text: string;
  children?: React.ReactElement | React.ReactElement[];
}

export default function SectionHeader(props: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeaderInnerContainer}>
      <div className={styles.sectionHeaderContentContainer}>
        <div className={styles.sectionHeaderText}>{props.text}</div>
        {props.children || null}
      </div>
      <div className={styles.sectionHeaderLine} />
    </div>
  );
}
