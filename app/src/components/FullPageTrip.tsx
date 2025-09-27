import { TRIP_STATUS_TO_TEXT } from "../constants";
import { MatchData, TripData, VictoryType } from "../interfaces";
import {
  combineClasses,
  formatDelay,
  getLatestDelayTime,
  getNameFromRouteId,
} from "../util";
import styles from "./../../page.module.css";
import ProgressPreview from "./ProgressPreview";
import ServiceBullet from "./ServiceBullet";
import VerticalProgress from "./VerticalProgress";

interface FullPageTripProps {
  trip: TripData;
  matchData: MatchData;
  leftSide: boolean;
}

export default function FullPageTrip(props: FullPageTripProps) {
  const tripStatusText = TRIP_STATUS_TO_TEXT[props.trip.tripStatus!];
  const latestDelayTime = getLatestDelayTime(props.trip);
  const isBehind = latestDelayTime !== undefined && latestDelayTime > 0;
  const isAhead = latestDelayTime !== undefined && latestDelayTime < 0;
  const delayTimeString =
    latestDelayTime !== undefined ? formatDelay(latestDelayTime) : "--";
  const victoryRequiredCoinToss =
    props.matchData.matchResult?.victoryType ===
      VictoryType.COIN_TOSS_BOTH_DQ ||
    props.matchData.matchResult?.victoryType ===
      VictoryType.COIN_TOSS_SAME_DELAY;
  const won = props.matchData.matchResult?.winner === props.trip.routeId;
  const finished = Boolean(props.matchData.matchResult);

  return (
    props.trip.routeId && (
      <>
        <div
          className={combineClasses(
            styles.fullPageTripHeader,
            props.leftSide && styles.leftSide
          )}
        >
          <div className={styles.fullPageDelayAndRouteContainer}>
            <div className={styles.fullPageRouteIdContainer}>
              <ServiceBullet routeId={props.trip.routeId} />
            </div>
            <div className={styles.fullPageDelayTimeContainer}>
              <div className={styles.fullPageDelayTime}>{delayTimeString}</div>
              <div className={styles.fullPageDelayText}>
                {isAhead ? "Ahead" : isBehind ? "Behind" : "On time"}
              </div>
            </div>
          </div>
          <div className={styles.fullPageRouteNameContainer}>
            {getNameFromRouteId(props.trip.routeId)}
          </div>
          <div className={styles.fullPageStatusText}>
            {tripStatusText}
            {finished &&
              ` • ${won ? "Won" : "Lost"}${
                victoryRequiredCoinToss ? " coin toss" : ""
              }`}
          </div>
          {finished && !won && <div className={styles.fullPageLoserShader} />}
        </div>
        <div className={styles.fullPageTripProgress}>
          <VerticalProgress
            tripData={props.trip}
            numStops={props.matchData.numStopsToFinish}
          />
        </div>
      </>
    )
  );
}
