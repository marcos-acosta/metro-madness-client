import Image from "next/image";
import styles from "./../../page.module.css";
import { combineClasses } from "../util";

interface NavigatorProps {
  onBack: () => void;
  onForward: () => void;
  backDisabled?: boolean;
  forwardDisabled?: boolean;
}

export default function Navigator(props: NavigatorProps) {
  return (
    <div className={styles.navigatorInnerContainer}>
      <button
        className={combineClasses(
          styles.arrowContainer,
          props.backDisabled && styles.disabled
        )}
        onClick={props.onBack}
        disabled={props.backDisabled}
      >
        <Image
          src="/arrows/left-arrow.svg"
          width="25"
          height="25"
          alt="Back one round"
          className={styles.arrowImage}
        />
        {props.backDisabled && <div className={styles.fadeToWhite} />}
      </button>
      <button
        className={combineClasses(
          styles.arrowContainer,
          props.forwardDisabled && styles.disabled
        )}
        onClick={props.onForward}
        disabled={props.forwardDisabled}
      >
        <Image
          src="/arrows/right-arrow.svg"
          width="25"
          height="25"
          alt="Forward one round"
          className={styles.arrowImage}
        />
        {props.forwardDisabled && <div className={styles.fadeToWhite} />}
      </button>
    </div>
  );
}
