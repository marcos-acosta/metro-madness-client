import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import FullPageTrip from "./FullPageTrip";
import ServiceBullet from "./ServiceBullet";

interface FullPageMatchProps {
  match: Match;
}

export default function FullPageMatch(props: FullPageMatchProps) {
  return (
    <div className={styles.fullPageMatchInnerContainer}>
      <div className={styles.fullPageMatchGrid}>
        {props.match.matchData.competingTrips.map((trip, i) => (
          <FullPageTrip
            trip={trip}
            matchData={props.match.matchData}
            key={trip.routeId}
            leftSide={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
