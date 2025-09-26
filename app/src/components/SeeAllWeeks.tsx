import Image from "next/image";
import styles from "./../../page.module.css";

interface SeeAllWeeksProps {
  callback: () => void;
}

export default function SeeAllWeeks(props: SeeAllWeeksProps) {
  return (
    <button
      className={styles.seeAllWeeksInnerContainer}
      onClick={props.callback}
    >
      <Image
        className={styles.seeAllWeeksArrow}
        src="/arrows/left-arrow.svg"
        width="20"
        height="20"
        alt="Arrow"
      />
      <div className={styles.seeAllWeeksText}>View all brackets</div>
    </button>
  );
}
