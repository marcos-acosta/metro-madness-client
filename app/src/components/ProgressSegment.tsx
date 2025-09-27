import { combineClasses } from "../util";
import styles from "./../../page.module.css";

interface ProgressSegmentProps {
  completed?: boolean;
  leftTerminalText?: string;
  rightTerminalText?: string;
  stationName?: string;
  isOnRightSide?: boolean;
  color: string;
  grayOut?: boolean;
  futureStopsInGray?: boolean;
  disableLeftRightAlign?: boolean;
  rightSubtitle?: string;
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
          props.completed && styles.filledSegment,
          props.grayOut && styles.graySegment
        )}
        style={{ backgroundColor: props.grayOut ? undefined : props.color }}
      />
      {props.stationName && (
        <div className={styles.rightTerminalContainer}>
          <div className={styles.rightTerminalSquareContainer}>
            <div className={styles.terminalSquare} />
          </div>
          <div
            className={combineClasses(
              styles.middleTerminalNameContainer,
              props.disableLeftRightAlign
                ? props.isOnRightSide
                  ? styles.rightAlign
                  : styles.leftAlign
                : undefined
            )}
          >
            <div
              className={combineClasses(
                styles.terminalNameContainer,
                props.futureStopsInGray &&
                  !props.completed &&
                  styles.grayStationName
              )}
            >
              {props.stationName}
            </div>
            {props.rightSubtitle && (
              <div className={styles.subtitleContainer}>
                {props.rightSubtitle}
              </div>
            )}
          </div>
        </div>
      )}
      {props.rightTerminalText && (
        <div className={styles.rightTerminalContainer}>
          <div className={styles.rightTerminalSquareContainer}>
            <div className={styles.terminalSquare} />
          </div>
          <div className={styles.rightTerminalNameContainer}>
            <div
              className={combineClasses(
                styles.terminalNameContainer,
                props.futureStopsInGray &&
                  !props.completed &&
                  styles.grayStationName
              )}
            >
              {props.rightTerminalText}
            </div>
            {props.rightSubtitle && (
              <div className={styles.subtitleContainer}>
                {props.rightSubtitle}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
