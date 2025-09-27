import { TripData, TripStatus, VictoryType } from "../interfaces";
import {
  combineClasses,
  formatDelay,
  getLatestDelayTime,
  getNameFromRouteId,
} from "../util";
import styles from "./../../page.module.css";
import ProgressPreview from "./ProgressPreview";
import ServiceBullet from "./ServiceBullet";

interface TripPreviewProps {
  tripData: TripData;
  numStops?: number;
  row: number;
  finished?: boolean;
  won?: boolean;
  victoryType?: VictoryType;
  showProgressPreview?: boolean;
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
  const isBehind = latestDelayTime !== undefined && latestDelayTime > 0;
  const isAhead = latestDelayTime !== undefined && latestDelayTime < 0;
  const delayTimeString =
    latestDelayTime !== undefined ? formatDelay(latestDelayTime) : "--";
  const isFinal = props.tripData.finalDelay !== undefined;
  const victoryRequiredCoinToss =
    props.victoryType === VictoryType.COIN_TOSS_BOTH_DQ ||
    props.victoryType === VictoryType.COIN_TOSS_SAME_DELAY;

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
        <div className={styles.serviceStatusContainer}>
          {tripStatusText}
          {props.finished &&
            ` • ${props.won ? "Won" : "Lost"}${
              victoryRequiredCoinToss ? " coin toss" : ""
            }`}
        </div>
      </div>
      {props.showProgressPreview && (
        <div
          className={styles.progressPreviewContainer}
          style={{ gridRow: props.row }}
        >
          <ProgressPreview
            tripData={props.tripData}
            numStops={props.numStops}
            lost={props.finished && !props.won}
          />
        </div>
      )}
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
