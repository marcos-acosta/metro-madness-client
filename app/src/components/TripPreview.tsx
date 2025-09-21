import { TripData, TripStatus } from "../interfaces";
import { getNameFromRouteId } from "../util";
import styles from "./../../page.module.css";
import ServiceBullet from "./ServiceBullet";

interface TripPreviewProps {
  tripData: TripData;
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

  return (
    <div className={styles.tripPreviewInnerContainer}>
      <div className={styles.routeIdContainer}>
        <ServiceBullet routeId={props.tripData.routeId!} />
      </div>
      <div className={styles.serviceNameAndStatusContainer}>
        <div className={styles.serviceNameContainer}>
          {getNameFromRouteId(props.tripData.routeId!)}
        </div>
        <div className={styles.serviceStatusContainer}>{tripStatusText}</div>
      </div>
    </div>
  );
}
