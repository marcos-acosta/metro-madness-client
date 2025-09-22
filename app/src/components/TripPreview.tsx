import { TripData, TripStatus } from "../interfaces";
import {
  combineClasses,
  formatDelay,
  getLatestDelayTime,
  getNameFromRouteId,
} from "../util";
import styles from "./../../page.module.css";
import ProgressBar from "./ProgressBar";
import ServiceBullet from "./ServiceBullet";

interface TripPreviewProps {
  tripData: TripData;
  numStops?: number;
  isLoser?: boolean;
  row: number;
}

const TRIP_STATUS_TO_TEXT = {
  [TripStatus.DQ_DISAPPEARED]: "Disqualified",
  [TripStatus.DQ_NEVER_ASSIGNED]: "Disqualified",
  [TripStatus.DQ_NO_COMPETITOR]: "Disqualified",
  [TripStatus.DQ_TOOK_TOO_LONG]: "Disqualified",
  [TripStatus.NOT_ASSIGNED]: "No train yet",
  [TripStatus.ONGOING]: "In transit",
  [TripStatus.FINISHED]: "Finished",
};

export default function TripPreview(props: TripPreviewProps) {
  const tripStatusText = TRIP_STATUS_TO_TEXT[props.tripData.tripStatus!];
  const latestDelayTime =
    props.tripData.finalDelay || getLatestDelayTime(props.tripData);
  const isBehind = latestDelayTime && latestDelayTime > 0;
  const isAhead = latestDelayTime && latestDelayTime < 0;
  const delayTimeString = latestDelayTime ? formatDelay(latestDelayTime) : "--";
  const isFinal = props.tripData.finalDelay !== undefined;

  return (
    <>
      <div className={styles.routeIdContainer} style={{ gridRow: props.row }}>
        <ServiceBullet routeId={props.tripData.routeId!} />
      </div>
      <div
        className={styles.serviceNameAndStatusContainer}
        style={{ gridRow: props.row }}
      >
        <div className={styles.serviceNameContainer}>
          {getNameFromRouteId(props.tripData.routeId!)}
        </div>
        <div className={styles.serviceStatusContainer}>{tripStatusText}</div>
      </div>
      <div className={styles.progressContainer} style={{ gridRow: props.row }}>
        <ProgressBar tripData={props.tripData} numStops={props.numStops} />
      </div>
      <div
        className={combineClasses(
          styles.delayContainer,
          isFinal && styles.isFinalTime
        )}
        style={{ gridRow: props.row }}
      >
        <div className={styles.delayTimeContainer}>{delayTimeString}</div>
        {latestDelayTime && (
          <div className={styles.delayTimeText}>
            {isAhead ? "Ahead" : isBehind ? "Behind" : "On time"}
          </div>
        )}
      </div>
    </>
  );
}
