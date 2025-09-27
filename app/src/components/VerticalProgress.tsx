import { TripData } from "../interfaces";
import {
  combineClasses,
  formatDelay,
  getColorFromRouteId,
  secondsSinceMidnightToTime,
} from "../util";
import styles from "./../../page.module.css";
import ProgressSegment from "./ProgressSegment";

interface VerticalProgressProps {
  tripData: TripData;
  numStops?: number;
}

const getStopSubtitle = (tripData: TripData, stopIndex: number) => {
  if (!tripData.stops) {
    return undefined;
  }
  const stopData = tripData.stops[stopIndex];
  if (stopData.delay) {
    const formattedDelay = formatDelay(stopData.delay);
    const suffix = stopData.delay > 0 ? "delay" : "ahead";
    return stopData.delay === 0 ? "On time" : `${formattedDelay} ${suffix}`;
  } else {
    const expectedTimeFormatted = secondsSinceMidnightToTime(
      stopData.predictedTimeSeconds
    );
    return `(${expectedTimeFormatted})`;
  }
};

const abridgeStationName = (stationName: string) => {
  if (stationName.length <= 15) {
    return stationName;
  } else {
    return `${stationName.slice(0, 15).trim()}…`;
  }
};

export default function VerticalProgress(props: VerticalProgressProps) {
  const lastCompletedStopIndex =
    props.tripData.stops &&
    props.tripData.stops.findLastIndex((stop) => stop.delay !== undefined);
  const color = getColorFromRouteId(props.tripData.routeId!);

  const numSegments = props.numStops || 20;

  return (
    <div
      className={combineClasses(styles.verticalProgressInnerContainer)}
      style={{ gridTemplateRows: `repeat(${numSegments}, 50px)` }}
    >
      {props.tripData.stops &&
        [...Array(numSegments).keys()].map((segmentIndex) => (
          <ProgressSegment
            color={color}
            futureStopsInGray={true}
            disableLeftRightAlign={true}
            key={segmentIndex}
            completed={
              lastCompletedStopIndex
                ? lastCompletedStopIndex > segmentIndex
                : false
            }
            leftTerminalText={
              segmentIndex === 0
                ? abridgeStationName(props.tripData.stops![0].stopName)
                : undefined
            }
            rightTerminalText={
              segmentIndex === numSegments - 1
                ? abridgeStationName(
                    props.tripData.stops![numSegments + 1].stopName
                  )
                : undefined
            }
            stationName={
              segmentIndex < numSegments - 1
                ? abridgeStationName(
                    props.tripData.stops![segmentIndex + 1].stopName
                  )
                : undefined
            }
            isOnRightSide={segmentIndex > numSegments / 2}
            rightSubtitle={getStopSubtitle(props.tripData, segmentIndex + 1)}
          />
        ))}
    </div>
  );
}
