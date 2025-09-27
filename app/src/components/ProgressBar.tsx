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

  const shouldShowRightCircle = (segmentIndex: number) => {
    return (
      props.tripData.stops &&
      props.tripData.stops[segmentIndex + 1].delay !== undefined &&
      (segmentIndex + 2 >= props.tripData.stops.length ||
        props.tripData.stops[segmentIndex + 2].delay === undefined)
    );
  };

  return (
    <div className={styles.progressBarInnerContainer}>
      <div
        className={combineClasses(
          styles.underlyingLineContainer,
          props.tripData.stops && styles.started
        )}
      >
        <div
          className={styles.progressLine}
          style={{ backgroundColor: color }}
        />
        <div
          className={styles.progressGrid}
          style={{ gridTemplateColumns: `repeat(${numStops}, 1fr)` }}
        >
          {props.tripData.stops &&
            props.tripData.stops
              .slice(1, numStops + 1)
              .map((stop, i) => (
                <ProgressBarSegment
                  showLeftCircle={i === 0}
                  stopNameLeft={
                    i === 0 ? props.tripData.stops![0].stopName : undefined
                  }
                  stopNameRight={
                    i === numStops - 1
                      ? props.tripData.stops![i + 1].stopName
                      : undefined
                  }
                  showRightCircle={shouldShowRightCircle(i)}
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
