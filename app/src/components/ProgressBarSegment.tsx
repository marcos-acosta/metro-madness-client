import { combineClasses } from "../util";
import styles from "./../../page.module.css";
import StopCircle from "./StopCircle";

interface ProgressBarSegmentProps {
  isFirstSegment?: boolean;
  filledIn: boolean;
  stopNameLeft?: string;
  stopNameRight?: string;
  color: string;
}

export default function ProgressBarSegment(props: ProgressBarSegmentProps) {
  return (
    <div
      className={styles.progressBarSegmentInnerContainer}
      style={{ backgroundColor: props.filledIn ? props.color : undefined }}
    >
      {props.isFirstSegment && (
        <div
          className={combineClasses(
            styles.stopContainer,
            styles.firstStopContainer
          )}
        >
          <StopCircle />
        </div>
      )}
      <div
        className={combineClasses(
          styles.stopContainer,
          styles.secondStopContainer
        )}
      >
        <StopCircle />
      </div>
    </div>
  );
}
