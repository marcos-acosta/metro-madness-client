import { TripData } from "../interfaces";
import { getColorFromRouteId } from "../util";
import styles from "./../../page.module.css";
import ProgressSegment from "./ProgressSegment";

interface ProgressPreviewProps {
  tripData: TripData;
  numStops?: number;
  lost?: boolean;
}

export default function ProgressPreview(props: ProgressPreviewProps) {
  const lastCompletedStopIndex =
    props.tripData.stops &&
    props.tripData.stops.findLastIndex((stop) => stop.delay !== undefined);
  const color = getColorFromRouteId(props.tripData.routeId!);

  const numSegments = (props.numStops || 20) - 1;

  return (
    <div className={styles.progressPreviewInnerContainer}>
      <div
        className={styles.progressPreviewBarContainer}
        style={{ gridTemplateColumns: `repeat(${numSegments}, 1fr)` }}
      >
        {props.tripData.stops &&
          [...Array(numSegments).keys()].map((segmentIndex) => (
            <ProgressSegment
              color={color}
              grayOut={props.lost}
              key={segmentIndex}
              completed={
                lastCompletedStopIndex
                  ? lastCompletedStopIndex > segmentIndex
                  : false
              }
              leftTerminalText={
                segmentIndex === 0
                  ? props.tripData.stops![0].stopName
                  : undefined
              }
              rightTerminalText={
                segmentIndex === numSegments - 1
                  ? props.tripData.stops![numSegments + 1].stopName
                  : undefined
              }
              stationName={
                lastCompletedStopIndex &&
                lastCompletedStopIndex > 0 &&
                lastCompletedStopIndex < numSegments &&
                segmentIndex + 1 === lastCompletedStopIndex
                  ? props.tripData.stops![segmentIndex + 1].stopName
                  : undefined
              }
              isOnRightSide={segmentIndex > numSegments / 2}
            />
          ))}
      </div>
    </div>
  );
}
