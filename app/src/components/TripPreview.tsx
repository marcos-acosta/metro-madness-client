import { TRIP_STATUS_TO_TEXT } from "../constants";
import { TripData, TripStatus, VictoryType } from "../interfaces";
import {
  combineClasses,
  formatDelay,
  getLatestDelayTimeUpToMaxNumStops,
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

export default function TripPreview(props: TripPreviewProps) {
  const tripStatusText = TRIP_STATUS_TO_TEXT[props.tripData.tripStatus!];
  const latestDelayTime =
    props.tripData.finalDelay ||
    getLatestDelayTimeUpToMaxNumStops(props.tripData, props.numStops);
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
