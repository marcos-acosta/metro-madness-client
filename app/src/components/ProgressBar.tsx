import { TripData } from "../interfaces";
import { combineClasses, getColorFromRouteId } from "../util";
import styles from "./../../page.module.css";
import ProgressBarSegment from "./ProgressBarSegment";

interface ProgressBarProps {
  tripData: TripData;
  numStops?: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const numStops = props.numStops || 20;
  const color = getColorFromRouteId(props.tripData.routeId!);
  return (
    <div className={styles.progressBarInnerContainer}>
      <div
        className={combineClasses(
          styles.underlyingLineContainer,
          props.tripData.stops && styles.started
        )}
      >
        <div
          className={styles.progressGrid}
          style={{ gridTemplateColumns: `repeat(${numStops}, 1fr)` }}
        >
          {props.tripData.stops &&
            props.tripData.stops
              .slice(1, numStops + 1)
              .map((stop, i) => (
                <ProgressBarSegment
                  isFirstSegment={i === 0}
                  color={color}
                  filledIn={stop.delay !== undefined}
                  key={i}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
