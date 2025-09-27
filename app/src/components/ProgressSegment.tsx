import { combineClasses } from "../util";
import styles from "./../../page.module.css";

interface ProgressSegmentProps {
  completed?: boolean;
  leftTerminalText?: string;
  rightTerminalText?: string;
  stationName?: string;
  isOnRightSide?: boolean;
  color: string;
}

export default function ProgressSegment(props: ProgressSegmentProps) {
  return (
    <div className={styles.segmentContainer}>
      {props.leftTerminalText && (
        <div className={styles.leftTerminalContainer}>
          <div className={styles.leftTerminalSquareContainer}>
            <div className={styles.terminalSquare} />
          </div>
          <div className={styles.leftTerminalNameContainer}>
            <div className={styles.terminalNameContainer}>
              {props.leftTerminalText}
            </div>
          </div>
        </div>
      )}
      <div
        className={combineClasses(
          styles.segment,
          props.completed && styles.filledSegment
        )}
        style={{ backgroundColor: props.color }}
      />
      {props.stationName && (
        <div className={styles.rightTerminalContainer}>
          <div className={styles.rightTerminalSquareContainer}>
            <div className={styles.terminalSquare} />
          </div>
          <div
            className={combineClasses(
              styles.middleTerminalNameContainer,
              props.isOnRightSide ? styles.rightAlign : styles.leftAlign
            )}
          >
            <div className={styles.terminalNameContainer}>
              {props.stationName}
            </div>
          </div>
        </div>
      )}
      {props.rightTerminalText && (
        <div className={styles.rightTerminalContainer}>
          <div className={styles.rightTerminalSquareContainer}>
            <div className={styles.terminalSquare} />
          </div>
          <div className={styles.rightTerminalNameContainer}>
            <div className={styles.terminalNameContainer}>
              {props.rightTerminalText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
