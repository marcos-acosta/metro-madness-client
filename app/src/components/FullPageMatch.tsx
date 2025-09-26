import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import ServiceBullet from "./ServiceBullet";

interface FullPageMatchProps {
  match: Match;
}

export default function FullPageMatch(props: FullPageMatchProps) {
  return (
    <div className={styles.fullPageMatchInnerContainer}>
      {props.match.matchData.competingTrips.map((trip) => (
        <div className={styles.tripHeader} key={trip.routeId}>
          <div className={styles.fullPageLineAndDelayContainer}>
            <div className={styles.fullPageLineContainer}>
              <ServiceBullet routeId={trip.routeId!} />
            </div>
            <div className={styles.fullPageDelayContainer}></div>
          </div>
          <div className={styles.fullPageNameAndProgressContainer}></div>
        </div>
      ))}
    </div>
  );
}
