import { combineClasses } from "../util";
import styles from "./../../page.module.css";
import StopCircle from "./StopCircle";

interface ProgressBarSegmentProps {
  showLeftCircle?: boolean;
  showRightCircle?: boolean;
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
      {props.showLeftCircle && (
        <div
          className={combineClasses(
            styles.stopContainer,
            styles.firstStopContainer
          )}
        >
          <StopCircle color={props.color} />
          {props.stopNameLeft && (
            <div className={styles.stopNameContainer}>{props.stopNameLeft}</div>
          )}
        </div>
      )}
      {props.showRightCircle && (
        <div
          className={combineClasses(
            styles.stopContainer,
            styles.secondStopContainer
          )}
        >
          <StopCircle color={props.filledIn ? props.color : undefined} />
        </div>
      )}
    </div>
  );
}
